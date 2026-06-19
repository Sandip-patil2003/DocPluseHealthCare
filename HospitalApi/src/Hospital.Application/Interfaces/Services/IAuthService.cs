namespace Hospital.Application.Interfaces.Services;

public interface IAuthService
{
    Task<string> GenerateTokenAsync(string username, string role, string email, CancellationToken cancellationToken = default);
}
