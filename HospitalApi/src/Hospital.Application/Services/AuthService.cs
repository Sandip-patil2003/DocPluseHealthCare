using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Hospital.Application.Interfaces.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Hospital.Application.Services;

public class AuthService : IAuthService
{
    private readonly IConfiguration _configuration;

    public AuthService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public Task<string> GenerateTokenAsync(string username, string role, string email, CancellationToken cancellationToken = default)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, username ?? string.Empty),
            new Claim(ClaimTypes.Role, role ?? string.Empty),
            new Claim(ClaimTypes.Email, email ?? string.Empty)
        };

        // Small optimization: use a default key if configuration missing (avoid empty key runtime errors)
        var keyString = _configuration["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key is not configured.");
        var issuer = _configuration["Jwt:Issuer"];
        var audience = _configuration["Jwt:Audience"];

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyString));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var expiresHours = 1;
        if (int.TryParse(_configuration["Jwt:ExpiresHours"], out var parsed))
            expiresHours = parsed;

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(expiresHours),
            signingCredentials: creds
        );

        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
        return Task.FromResult(tokenString);
    }
}
