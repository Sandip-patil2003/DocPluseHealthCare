using Hospital.Application.DTOs.Auth;
using Hospital.Application.Interfaces.Email;
using Hospital.Application.Interfaces.Services;
using Hospital.Domain.Entities;
using Hospital.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Hospital.Infrastructure.Services;

public class AccountService : IAccountService
{
    private readonly HospitalDbContext _context;
    private readonly IEmailSender _emailSender;
    private readonly IAuthService _authService;

    public AccountService(HospitalDbContext context, IEmailSender emailSender, IAuthService authService)
    {
        _context = context;
        _emailSender = emailSender;
        _authService = authService;
    }

    public async Task RegisterAsync(RegisterDto dto, CancellationToken cancellationToken = default)
    {
        var otpOk = await _context.OtpVerifications
            .Where(x => x.Email == dto.Email && x.Verified && x.ExpiresAtUtc > DateTime.UtcNow)
            .OrderByDescending(x => x.Id)
            .FirstOrDefaultAsync(cancellationToken);

        if (otpOk == null) throw new InvalidOperationException("Please verify the email with OTP before registering.");

        if (await _context.Users.AnyAsync(u => u.Username == dto.Username, cancellationToken))
            throw new InvalidOperationException("Username already exists.");

        if (await _context.Users.AnyAsync(u => u.Email == dto.Email, cancellationToken))
            throw new InvalidOperationException("Email already exists.");

        var user = new User
        {
            Username = dto.Username,
            Email = dto.Email,
            PasswordHash = global::BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = "User"
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync(cancellationToken);

        await _emailSender.SendEmailAsync(dto.Email, "Welcome to Our Hospital Management System", EmailTemplates.WelcomeHtml(dto.Username));
    }

    public async Task SendOtpAsync(string email, string subject, CancellationToken cancellationToken = default)
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
        await _context.SaveChangesAsync(cancellationToken);

        await _emailSender.SendEmailAsync(email, subject, $"Your verification code is {code}. It expires in 10 minutes.");
    }

    public async Task VerifyOtpAsync(VerifyOtpDto dto, CancellationToken cancellationToken = default)
    {
        var record = await _context.OtpVerifications
            .Where(x => x.Email == dto.Email && !x.Verified)
            .OrderByDescending(x => x.Id)
            .FirstOrDefaultAsync(cancellationToken);

        if (record == null) throw new InvalidOperationException("OTP not found. Please request a new one.");
        if (record.ExpiresAtUtc <= DateTime.UtcNow) throw new InvalidOperationException("OTP expired. Please request a new one.");
        if (!string.Equals(record.Code, dto.Code?.Trim())) throw new InvalidOperationException("Invalid OTP code.");

        record.Verified = true;
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task SendForgotPasswordOtpAsync(ForgotPasswordOtpDto dto, CancellationToken cancellationToken = default)
    {
        var userExists = await _context.Users
            .AnyAsync(u => u.Email == dto.Email.Trim() && u.Username == dto.Username.Trim(), cancellationToken);

        if (!userExists) throw new InvalidOperationException("We couldn't find an account with that email and username.");

        await SendOtpAsync(dto.Email, "Reset your DocPulse password", cancellationToken);
    }

    public async Task ResetPasswordAsync(ResetPasswordDto dto, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.NewPassword))
            throw new InvalidOperationException("Email and password are required.");

        if (dto.NewPassword.Length < 8)
            throw new InvalidOperationException("Password must be at least 8 characters.");

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email.Trim(), cancellationToken);
        if (user == null) throw new InvalidOperationException("We couldn't find an account with that email.");

        var otpRecord = await _context.OtpVerifications
            .Where(x => x.Email == dto.Email.Trim() && x.Verified && x.ExpiresAtUtc > DateTime.UtcNow)
            .OrderByDescending(x => x.Id)
            .FirstOrDefaultAsync(cancellationToken);

        if (otpRecord == null) throw new InvalidOperationException("Please verify the OTP before resetting your password.");

        user.PasswordHash = global::BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
        _context.OtpVerifications.Remove(otpRecord);
        await _context.SaveChangesAsync(cancellationToken);

        await _emailSender.SendEmailAsync(user.Email, "Your DocPulse password was changed", "If you did not request this change, please contact support immediately.");
    }

    public async Task<string> LoginAsync(LoginDto dto, CancellationToken cancellationToken = default)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == dto.Username, cancellationToken);
        if (user == null || !global::BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            throw new InvalidOperationException("Invalid credentials.");

        var tokenString = await _authService.GenerateTokenAsync(user.Username, user.Role, user.Email, cancellationToken);
        return tokenString;
    }
}
