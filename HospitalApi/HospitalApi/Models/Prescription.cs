using System;
using System.Collections.Generic;

namespace HospitalApi.Models;

public partial class Prescription
{
    public int PrescriptionId { get; set; }

    public int? PatientId { get; set; }

    public int? DoctorId { get; set; }

    public string? Medication { get; set; }

    public string? Dosage { get; set; }

    public DateOnly? DatePrescribed { get; set; }

    public virtual Doctor? Doctor { get; set; }

    public virtual Patient? Patient { get; set; }
}
