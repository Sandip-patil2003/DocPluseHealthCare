using Hospital.Domain.Entities;

namespace Hospital.Application.Interfaces.Repositories;

public interface IPatientRepository : IGenericRepository<Patient>
{
    Task<IReadOnlyList<Patient>> GetActivePatientsAsync(CancellationToken cancellationToken = default);
    Task<bool> ExistsAsync(int id, CancellationToken cancellationToken = default);
}



