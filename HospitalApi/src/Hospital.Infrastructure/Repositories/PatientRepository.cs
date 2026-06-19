using Hospital.Application.Interfaces.Repositories;
using Hospital.Domain.Entities;
using Hospital.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Hospital.Infrastructure.Repositories;

public class PatientRepository : GenericRepository<Patient>, IPatientRepository
{
    public PatientRepository(HospitalDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyList<Patient>> GetActivePatientsAsync(CancellationToken cancellationToken = default)
        => await Context.Patients.Where(p => p.Active).AsNoTracking().ToListAsync(cancellationToken);

    public async Task<bool> ExistsAsync(int id, CancellationToken cancellationToken = default)
        => await Context.Patients.AnyAsync(p => p.PatientId == id, cancellationToken);
}



