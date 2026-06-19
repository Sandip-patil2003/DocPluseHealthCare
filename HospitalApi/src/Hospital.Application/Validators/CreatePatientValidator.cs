using FluentValidation;
using Hospital.Application.DTOs.Patient;

namespace Hospital.Application.Validators;

public class CreatePatientValidator : AbstractValidator<CreatePatientDto>
{
    public CreatePatientValidator()
    {
        RuleFor(x => x.FirstName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.LastName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Gender).MaximumLength(10);
        RuleFor(x => x.Phone).MaximumLength(15);
    }
}



