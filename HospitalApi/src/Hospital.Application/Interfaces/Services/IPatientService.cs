using Hospital.Application.DTOs.Patient;

namespace Hospital.Application.Interfaces.Services;

public interface IPatientService
{
    Task<IReadOnlyList<PatientResponseDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<PatientResponseDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<PatientResponseDto> CreateAsync(CreatePatientDto request, CancellationToken cancellationToken = default);
    Task<bool> UpdateAsync(int id, UpdatePatientDto request, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}



