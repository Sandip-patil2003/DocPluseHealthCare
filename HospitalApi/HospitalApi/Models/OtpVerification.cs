using System;

namespace HospitalApi.Models;

public class OtpVerification
{
    public int Id { get; set; }
    public string Email { get; set; } = null!;
    public string Code { get; set; } = null!;
    public DateTime ExpiresAtUtc { get; set; }
    public bool Verified { get; set; }
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}


