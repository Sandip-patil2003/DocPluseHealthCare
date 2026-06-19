using FluentValidation;
using Hospital.Application.Interfaces.Services;
using Hospital.Application.Interfaces.Email;
using Hospital.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Hospital.Application.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddAutoMapper(typeof(ServiceCollectionExtensions).Assembly);
        services.AddValidatorsFromAssembly(typeof(ServiceCollectionExtensions).Assembly);
        services.AddScoped<IPatientService, PatientService>();
        services.AddScoped<IAuthService, AuthService>();

        return services;
    }
}



