using Hospital.Application.Interfaces.Services;

namespace Hospital.Application.Services;

public class AuthService : IAuthService
{
    public Task<string> GenerateTokenAsync(string username, string role, string email, CancellationToken cancellationToken = default)
        => Task.FromResult(string.Empty);
}
