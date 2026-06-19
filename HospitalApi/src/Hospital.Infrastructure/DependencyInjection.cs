using Hospital.Application.Interfaces.Repositories;
using Hospital.Application.Interfaces.Services;
using Hospital.Application.Interfaces.Email;
using Hospital.Infrastructure.Data;
using Hospital.Infrastructure.Repositories;
using Hospital.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Hospital.Infrastructure;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<HospitalDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("HospitalDB")));

        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        services.AddScoped<IPatientRepository, PatientRepository>();
        services.AddTransient<IEmailSender, EmailSender>();
        services.AddScoped<IAccountService, AccountService>();

        return services;
    }
}



