using FluentValidation;
using Hospital.Application.DTOs.Patient;

namespace Hospital.Application.Validators;

public class UpdatePatientValidator : AbstractValidator<UpdatePatientDto>
{
    public UpdatePatientValidator()
    {
        RuleFor(x => x.PatientId).GreaterThan(0);
        Include(new CreatePatientValidator());
    }
}



