using Hospital.Application.Interfaces.Repositories;
using Hospital.Domain.Entities;

namespace Hospital.Infrastructure.Repositories;

public class DoctorRepository : IGenericRepository<Doctor>
{
    public Task<Doctor> AddAsync(Doctor entity, CancellationToken cancellationToken = default) => Task.FromResult(entity);
    public Task DeleteAsync(Doctor entity, CancellationToken cancellationToken = default) => Task.CompletedTask;
    public Task<IReadOnlyList<Doctor>> GetAllAsync(CancellationToken cancellationToken = default) => Task.FromResult<IReadOnlyList<Doctor>>(new List<Doctor>());
    public Task<Doctor?> GetByIdAsync(int id, CancellationToken cancellationToken = default) => Task.FromResult<Doctor?>(null);
    public Task UpdateAsync(Doctor entity, CancellationToken cancellationToken = default) => Task.CompletedTask;
}
