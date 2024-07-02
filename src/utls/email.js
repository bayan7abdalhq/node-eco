import nodemailer  from "nodemailer";
import { emailTemplate } from "./emailTemplate.js";
async function SendEmail(to,subject,userName='',token) {
    const transporter = nodemailer.createTransport({
       service:"gmail",
        auth: {
          user: process.env.emailSender,
          pass: process.env.passSender,
        },
      });
      const info = await transporter.sendMail({
        from: `bayan abdalhq <${process.env.emailSender}>`, 
        to,
        subject, 
        html:emailTemplate(to,userName,token),
        
      });
}
export default SendEmail;