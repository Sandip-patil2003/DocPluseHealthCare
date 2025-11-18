using HospitalApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace HospitalApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly HospitalDbContext _context;
        private readonly IEmailSender _emailSender;

        public ContactController(HospitalDbContext context, IEmailSender emailSender)
        {
            _context = context;
            _emailSender = emailSender;
        }

        [HttpPost("send")]
        public async Task<IActionResult> Send([FromBody] ContactMessage model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Save the actual user message to the database
            _context.ContactMessages.Add(model);
            await _context.SaveChangesAsync();

            try
            {
                // Send email to admin/support with actual user message
                await _emailSender.SendEmailAsync(
                    "sandippat2003@gmail.com",
                    "New Contact Message",
                    $"Name: {model.Name}\nEmail: {model.Email}\nMessage:\n{model.Message}"
                );

                // Send friendly confirmation email to user
                string confirmationMessage = $@"
                 Dear {model.Name},

Thank you for reaching out to us. We have received your message and want to assure you that your concerns are very important to us.

Our team is currently reviewing your message and will get back to you as soon as possible with a resolution.

If you have any urgent questions, please feel free to reply to this email or contact us directly at support@hospital.com.

Thank you for trusting us!

Best regards,
Hospital Support Team
";

                await _emailSender.SendEmailAsync(
                    model.Email,
                    "Thank you for contacting us",
                    confirmationMessage
                );
            }
            catch (Exception ex)
            {
                // Log the error (use your logger here)
                return StatusCode(500, "Failed to send email: " + ex.Message);
            }

             return Ok(new { message = "Message sent successfully." });
        }



    }
}
