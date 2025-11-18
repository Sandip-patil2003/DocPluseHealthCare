using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

public class EmailSender : IEmailSender
{
    private readonly IConfiguration _config;

    public EmailSender(IConfiguration config)
    {
        _config = config;
    }

    public async Task SendEmailAsync(string to, string subject, string body)
    {
        var smtp = _config.GetSection("Smtp");

        var message = new MailMessage
        {
            From = new MailAddress(smtp["Username"]),
            Subject = subject,
            Body = body,
            IsBodyHtml = false // Change to true if sending HTML
        };
        message.To.Add(to);

        using var client = new SmtpClient(smtp["Host"])
        {
            Port = int.Parse(smtp["Port"]),
            Credentials = new NetworkCredential(smtp["Username"], smtp["Password"]),
            EnableSsl = bool.Parse(smtp["EnableSsl"])
        };

        await client.SendMailAsync(message);
    }
}
