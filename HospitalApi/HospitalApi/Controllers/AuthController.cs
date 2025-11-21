using HospitalApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HospitalApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly HospitalDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IEmailSender _emailSender;

        public AuthController(HospitalDbContext context, IConfiguration configuration, IEmailSender emailSender)
        {
            _context = context;
            _configuration = configuration;
            _emailSender = emailSender;
        }

        // POST: api/Auth/register
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            // Require verified OTP for the email
            var otpOk = await _context.OtpVerifications
                .Where(x => x.Email == registerDto.Email && x.Verified && x.ExpiresAtUtc > DateTime.UtcNow)
                .OrderByDescending(x => x.Id)
                .FirstOrDefaultAsync();
            if (otpOk == null)
            {
                return BadRequest("Please verify the email with OTP before registering.");
            }
            if (await _context.Users.AnyAsync(u => u.Username == registerDto.Username))
                return BadRequest("Username already exists.");

            if (await _context.Users.AnyAsync(u => u.Email == registerDto.Email))
                return BadRequest("Email already exists.");

            var user = new User
            {
                Username = registerDto.Username,
                Email = registerDto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
                Role = "User"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            try
            {
                await _emailSender.SendEmailAsync(
                    registerDto.Email,
                    "Welcome to Our Hospital!",
                    $@"Dear {registerDto.Username},

Thank you for registering with our Hospital Management System.

You can now log in and manage your appointments, prescriptions, and more.

If you have any questions, feel free to reach out to us at support@hospital.com.

Best regards,
Hospital Support Team"
                );
            }
            catch (Exception ex)
            {
                return StatusCode(500, "User registered, but email could not be sent: " + ex.Message);
            }

            return Ok("User registered successfully.");
        }

        // POST: api/Auth/send-otp
        [HttpPost("send-otp")]
        [AllowAnonymous]
        public async Task<IActionResult> SendOtp([FromBody] SendOtpDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email)) return BadRequest("Email is required.");

            await CreateOtpAndNotifyAsync(dto.Email, "Your DocPulse verification code");
            return Ok(new { message = "OTP sent" });
        }

        // POST: api/Auth/verify-otp
        [HttpPost("verify-otp")]
        [AllowAnonymous]
        public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpDto dto)
        {
            return await VerifyOtpInternalAsync(dto);
        }

        [HttpPost("forgot-password/send-otp")]
        [AllowAnonymous]
        public async Task<IActionResult> SendForgotPasswordOtp([FromBody] ForgotPasswordOtpDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Username))
            {
                return BadRequest("Email and Username are required.");
            }

            var userExists = await _context.Users
                .AnyAsync(u => u.Email == dto.Email.Trim() && u.Username == dto.Username.Trim());

            if (!userExists)
            {
                return BadRequest("We couldn't find an account with that email and username.");
            }

            await CreateOtpAndNotifyAsync(dto.Email, "Reset your DocPulse password");

            return Ok(new { message = "Password reset OTP sent" });
        }


        [HttpPost("forgot-password/verify-otp")]
        [AllowAnonymous]
        public async Task<IActionResult> VerifyForgotPasswordOtp([FromBody] VerifyOtpDto dto)
        {
            return await VerifyOtpInternalAsync(dto);
        }

        [HttpPost("forgot-password/reset")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.NewPassword))
            {
                return BadRequest("Email and password are required.");
            }

            if (dto.NewPassword.Length < 8)
            {
                return BadRequest("Password must be at least 8 characters.");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email.Trim());
            if (user == null)
            {
                return BadRequest("We couldn't find an account with that email.");
            }

            var otpRecord = await _context.OtpVerifications
                .Where(x => x.Email == dto.Email.Trim() && x.Verified && x.ExpiresAtUtc > DateTime.UtcNow)
                .OrderByDescending(x => x.Id)
                .FirstOrDefaultAsync();

            if (otpRecord == null)
            {
                return BadRequest("Please verify the OTP before resetting your password.");
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            _context.OtpVerifications.Remove(otpRecord);
            await _context.SaveChangesAsync();

            await _emailSender.SendEmailAsync(user.Email, "Your DocPulse password was changed", "If you did not request this change, please contact support immediately.");

            return Ok(new { message = "Password updated successfully." });
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == loginDto.Username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
                return Unauthorized("Invalid credentials.");

            var claims = new[]
            {
        new Claim(ClaimTypes.Name, user.Username),
        new Claim(ClaimTypes.Role, user.Role)
    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(

                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                user = new
                {
                    username = user.Username,
                    role = user.Role,
                    email = user.Email
                }
            });
        }

        private async Task CreateOtpAndNotifyAsync(string email, string subject)
        {
            var code = new Random().Next(100000, 999999).ToString();

            var record = new OtpVerification
            {
                Email = email.Trim(),
                Code = code,
                ExpiresAtUtc = DateTime.UtcNow.AddMinutes(10),
                Verified = false
            };

            _context.OtpVerifications.Add(record);
            await _context.SaveChangesAsync();

            await _emailSender.SendEmailAsync(email, subject, $"Your verification code is {code}. It expires in 10 minutes.");
        }


        private async Task<IActionResult> VerifyOtpInternalAsync(VerifyOtpDto dto)
        {
            var record = await _context.OtpVerifications
                .Where(x => x.Email == dto.Email && !x.Verified)
                .OrderByDescending(x => x.Id)
                .FirstOrDefaultAsync();

            if (record == null) return BadRequest("OTP not found. Please request a new one.");
            if (record.ExpiresAtUtc <= DateTime.UtcNow) return BadRequest("OTP expired. Please request a new one.");
            if (!string.Equals(record.Code, dto.Code?.Trim())) return BadRequest("Invalid OTP code.");

            record.Verified = true;
            await _context.SaveChangesAsync();
            return Ok(new { message = "OTP verified" });
        }
    }

    
   


}

public class RegisterDto
{
    public string Username { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}

public class SendOtpDto
{
    public string Email { get; set; } = null!;
   
}
public class ForgotPasswordOtpDto
{
    public string Email { get; set; } = null!;
    public string Username { get; set; } = null!;
}

public class VerifyOtpDto
{
    public string Email { get; set; } = null!;
    public string Code { get; set; } = null!;
}

public class LoginDto
{
    public string Username { get; set; } = null!;
    public string Password { get; set; } = null!;
}

public class ResetPasswordDto
{
    public string Email { get; set; } = null!;
    public string NewPassword { get; set; } = null!;
}


