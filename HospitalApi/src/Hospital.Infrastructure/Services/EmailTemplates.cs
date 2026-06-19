namespace Hospital.Infrastructure.Services;

internal static class EmailTemplates
{
    public static string WelcomeHtml(string username) => $@"<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
</head>
<body style='margin:0;padding:0;background-color:#f4f6f9;font-family:Arial,sans-serif;'>

    <table width='100%' cellpadding='0' cellspacing='0' style='background-color:#f4f6f9;padding:30px 0;'>
        <tr>
            <td align='center'>

                <table width='600' cellpadding='0' cellspacing='0' style='background:#ffffff;border-radius:10px;overflow:hidden;'>

                    <!-- Header -->
                    <tr>
                        <td style='background:#007bff;color:white;padding:25px;text-align:center;'>
                            <h1 style='margin:0;'>&#x1F3E5; Hospital Management System</h1>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style='padding:40px;'>

                            <h2 style='color:#333;'>Welcome, {username}!</h2>

                            <p style='font-size:16px;color:#555;line-height:1.6;'>
                                Thank you for registering with our Hospital Management System.
                            </p>

                            <p style='font-size:16px;color:#555;line-height:1.6;'>
                                Your account has been created successfully. You can now access our platform and manage:
                            </p>

                            <ul style='color:#555;font-size:16px;line-height:1.8;'>
                                <li>&#x1F4C5; Book &amp; Manage Appointments</li>
                                <li>&#x1F48A; View Prescriptions</li>
                                <li>&#x1FA7A; Access Medical Records</li>
                                <li>&#x1F4CB; Track Health Information</li>
                            </ul>

                            <div style='text-align:center;margin:30px 0;'>
                                <a href='https:http://localhost:5173/login'
                                   style='background:#007bff;color:white;padding:14px 30px;text-decoration:none;border-radius:5px;font-size:16px;font-weight:bold;'>
                                    Login Now
                                </a>
                            </div>

                            <p style='font-size:15px;color:#555;line-height:1.6;'>
                                If you have any questions or need assistance, please contact our support team.
                            </p>

                            <p style='font-size:15px;color:#555;'>
                                &#x1F4E7; support@hospital.com
                            </p>

                            <br/>

                            <p style='color:#333;'>
                                Best Regards,<br/>
                                <strong>Hospital Support Team</strong>
                            </p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style='background:#f8f9fa;padding:20px;text-align:center;color:#888;font-size:13px;'>
                            © {DateTime.Now.Year} Hospital Management System. All Rights Reserved.
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>";
}
