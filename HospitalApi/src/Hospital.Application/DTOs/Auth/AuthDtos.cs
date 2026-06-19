namespace Hospital.Application.DTOs.Auth;

public record RegisterDto(string Username, string Email, string Password);

public record SendOtpDto(string Email);

public record ForgotPasswordOtpDto(string Email, string Username);

public record VerifyOtpDto(string Email, string Code);

public record LoginDto(string Username, string Password);

public record ResetPasswordDto(string Email, string NewPassword);

public record MessageResponseDto(string Message);

public record UserResponseDto(string Username, string Role, string Email);

public record LoginResponseDto(string Token, UserResponseDto User);
