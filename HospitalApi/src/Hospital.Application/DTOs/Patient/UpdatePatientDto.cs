namespace Hospital.Application.DTOs.Patient;

public class UpdatePatientDto : CreatePatientDto
{
    public int PatientId { get; set; }
    public bool Active { get; set; } = true;
}



