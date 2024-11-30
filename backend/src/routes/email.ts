import express, { Request,Response } from "express";
import { authMiddleware } from "../middlewares/authMiddelware";
import { scheduleEmail } from "../controllers/emailController";

const emailRouter = express.Router();
emailRouter.post("/sendEmail", authMiddleware, scheduleEmail);
// emailRouter.post("/sendEmailto", authMiddleware,async (req: Request, res: Response)=>{
//     const { to, subject, body } = req.body; 
//     const nodemailer = require('nodemailer');
//     const transporter = nodemailer.createTransport({
//         secure:false,
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });
  
//     try {
//       await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to,
//         subject,
//         text: body,
//       });
//       console.log(`Email sent to ${to} with subject "${subject}"`); // Log successful sending
//     } catch (error) {
//       console.error('Error sending email:', error); // Log any errors while sending email
//     }
// });

export default emailRouter;
