using Hospital.Application.DTOs.Auth;

namespace Hospital.Application.Interfaces.Services;

public interface IAccountService
{
    Task RegisterAsync(RegisterDto dto, CancellationToken cancellationToken = default);
    Task SendOtpAsync(string email, string subject, CancellationToken cancellationToken = default);
    Task VerifyOtpAsync(VerifyOtpDto dto, CancellationToken cancellationToken = default);
    Task SendForgotPasswordOtpAsync(ForgotPasswordOtpDto dto, CancellationToken cancellationToken = default);
    Task ResetPasswordAsync(ResetPasswordDto dto, CancellationToken cancellationToken = default);
    Task<string> LoginAsync(LoginDto dto, CancellationToken cancellationToken = default);
}
