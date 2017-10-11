using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using Microsoft.Web;
using Microsoft.AspNet.Identity;
using SendGrid.Helpers.Mail;
using SendGrid;

namespace MicroRecordApi.Services
{
    public class EmailService : IIdentityMessageService
    {
        public async Task SendAsync(IdentityMessage message)
        {
            await ConfigSendGridasync(message);
        }

        // Use NuGet to install SendGrid (Basic C# client lib) 
        private async Task ConfigSendGridasync(IdentityMessage message)
        {
            //var myMessage = new SendGridMessage();

            //myMessage.AddTo(message.Destination);
            //myMessage.From = new EmailAddress("microrecord@service.com", "microrecord");
            //myMessage.Subject = message.Subject;
            //myMessage.PlainTextContent = message.Body;
            //myMessage.HtmlContent = message.Body;

            //var credentials = new NetworkCredential(ConfigurationManager.AppSettings["emailService:Account"],
            //    ConfigurationManager.AppSettings["emailService:Password"]);

            //// Create a Web transport for sending email.
            //var t = new SendGrid.Web(credentials);

            //// Send the email.
            //if (transportWeb != null)
            //{
            //    await transportWeb.DeliverAsync(myMessage);
            //}
            //else
            //{
            //    //Trace.TraceError("Failed to create Web transport.");
            //    await Task.FromResult(0);
            //}
        }
    }
}