using AutoMapper;
using Hospital.Application.Interfaces.Repositories;
using Hospital.Application.Interfaces.Services;
using Hospital.Application.Interfaces.Email;
using Hospital.Application.DTOs.Patient;
using Hospital.Domain.Entities;

namespace Hospital.Application.Services;

public class PatientService : IPatientService
{
    private readonly IPatientRepository _patientRepository;
    private readonly IMapper _mapper;

    public PatientService(IPatientRepository patientRepository, IMapper mapper)
    {
        _patientRepository = patientRepository;
        _mapper = mapper;
    }

    public async Task<IReadOnlyList<PatientResponseDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var patients = await _patientRepository.GetActivePatientsAsync(cancellationToken);
        return _mapper.Map<IReadOnlyList<PatientResponseDto>>(patients);
    }

    public async Task<PatientResponseDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        var patient = await _patientRepository.GetByIdAsync(id, cancellationToken);
        return patient is null ? null : _mapper.Map<PatientResponseDto>(patient);
    }

    public async Task<PatientResponseDto> CreateAsync(CreatePatientDto request, CancellationToken cancellationToken = default)
    {
        var entity = _mapper.Map<Patient>(request);
        entity.Active = true;

        var created = await _patientRepository.AddAsync(entity, cancellationToken);
        return _mapper.Map<PatientResponseDto>(created);
    }

    public async Task<bool> UpdateAsync(int id, UpdatePatientDto request, CancellationToken cancellationToken = default)
    {
        var existing = await _patientRepository.GetByIdAsync(id, cancellationToken);
        if (existing is null)
        {
            return false;
        }

        _mapper.Map(request, existing);
        await _patientRepository.UpdateAsync(existing, cancellationToken);
        return true;
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var existing = await _patientRepository.GetByIdAsync(id, cancellationToken);
        if (existing is null)
        {
            return false;
        }

        existing.Active = false;
        await _patientRepository.UpdateAsync(existing, cancellationToken);
        return true;
    }
}



