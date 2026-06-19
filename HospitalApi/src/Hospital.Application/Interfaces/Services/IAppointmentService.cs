using Hospital.Domain.Entities;

namespace Hospital.Application.Interfaces.Services;

public interface IAppointmentService
{
    Task<IReadOnlyList<Appointment>> GetAllAsync(CancellationToken cancellationToken = default);
}
