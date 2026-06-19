namespace Hospital.Application.DTOs.Patient;

public class PatientResponseDto
{
    public int PatientId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public DateOnly? DateOfBirth { get; set; }
    public string? Gender { get; set; }
    public string? Phone { get; set; }
    public bool Active { get; set; }
}



