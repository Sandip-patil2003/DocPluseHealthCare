using Hospital.Application.Interfaces.Services;
using Hospital.Application.Interfaces.Email;
using Hospital.Application.DTOs.Auth;
using Hospital.Domain.Entities;
using Hospital.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Hospital.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly HospitalDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IEmailSender _emailSender;
        private readonly Hospital.Application.Interfaces.Services.IAuthService _authService;
        private readonly Hospital.Application.Interfaces.Services.IAccountService _accountService;

        public AuthController(HospitalDbContext context, IConfiguration configuration, IEmailSender emailSender, Hospital.Application.Interfaces.Services.IAuthService authService, Hospital.Application.Interfaces.Services.IAccountService accountService)
        {
            _context = context;
            _configuration = configuration;
            _emailSender = emailSender;
            _authService = authService;
            _accountService = accountService;
        }

        // POST: api/Auth/register
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                await _accountService.RegisterAsync(registerDto);
                return Ok("User registered successfully.");
            }
            catch (InvalidOperationException ioe)
            {
                return BadRequest(ioe.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "User registered, but email could not be sent: " + ex.Message);
            }
        }

        // POST: api/Auth/send-otp
        [HttpPost("send-otp")]
        [AllowAnonymous]
        public async Task<IActionResult> SendOtp([FromBody] SendOtpDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email)) return BadRequest("Email is required.");

            try
            {
                await _accountService.SendOtpAsync(dto.Email, "Your DocPulse verification code");
                return Ok(new MessageResponseDto("OTP sent"));
            }
            catch (InvalidOperationException ioe)
            {
                return BadRequest(new MessageResponseDto(ioe.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new MessageResponseDto(ex.Message));
            }
        }

        // POST: api/Auth/verify-otp
        [HttpPost("verify-otp")]
        [AllowAnonymous]
        public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpDto dto)
        {
            try
            {
                await _accountService.VerifyOtpAsync(dto);
                return Ok(new MessageResponseDto("OTP verified"));
            }
            catch (InvalidOperationException ioe)
            {
                return BadRequest(new MessageResponseDto(ioe.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new MessageResponseDto(ex.Message));
            }
        }

        [HttpPost("forgot-password/send-otp")]
        [AllowAnonymous]
        public async Task<IActionResult> SendForgotPasswordOtp([FromBody] ForgotPasswordOtpDto dto)
        {
            try
            {
                await _accountService.SendForgotPasswordOtpAsync(dto);
                return Ok(new MessageResponseDto("Password reset OTP sent"));
            }
            catch (InvalidOperationException ioe)
            {
                return BadRequest(new MessageResponseDto(ioe.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new MessageResponseDto(ex.Message));
            }
        }


        [HttpPost("forgot-password/verify-otp")]
        [AllowAnonymous]
        public async Task<IActionResult> VerifyForgotPasswordOtp([FromBody] VerifyOtpDto dto)
        {
            try
            {
                await _accountService.VerifyOtpAsync(dto);
                return Ok(new MessageResponseDto("OTP verified"));
            }
            catch (InvalidOperationException ioe)
            {
                return BadRequest(new MessageResponseDto(ioe.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new MessageResponseDto(ex.Message));
            }
        }

        [HttpPost("forgot-password/reset")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
        {
            try
            {
                await _accountService.ResetPasswordAsync(dto);
                return Ok(new MessageResponseDto("Password updated successfully."));
            }
            catch (InvalidOperationException ioe)
            {
                return BadRequest(new MessageResponseDto(ioe.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new MessageResponseDto(ex.Message));
            }
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var token = await _accountService.LoginAsync(loginDto);
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == loginDto.Username);
                var response = new LoginResponseDto(token, new UserResponseDto(user!.Username, user.Role, user.Email));
                return Ok(response);
            }
            catch (InvalidOperationException ioe)
            {
                return Unauthorized(ioe.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new MessageResponseDto(ex.Message));
            }
        }
    }

    
   


}







