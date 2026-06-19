using Hospital.Domain.Entities;
using Hospital.Application.Interfaces.Services;

namespace Hospital.Application.Services;

public class AppointmentService : IAppointmentService
{
    public Task<IReadOnlyList<Appointment>> GetAllAsync(CancellationToken cancellationToken = default)
        => Task.FromResult<IReadOnlyList<Appointment>>(new List<Appointment>());
}
