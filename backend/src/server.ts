import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { dbConnection } from "./config/database";
import authRouter from "./routes/auth";
import emailRouter from "./routes/email";
import agenda, { startAgenda } from "./config/agenda";
import nodemailer from "nodemailer";
const app = express();
dotenv.config();

app.use(cookieParser()); // to set cookies
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); // to allow request from this domain
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/email", emailRouter);

// agenda.define("send-email", async (job: any) => {
//   console.log("Job is executing"); // This should log when the job executes
//   const { to, subject, body } = job.attrs.data;
//    await job.save()
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     host: process.env.SMTP_HOST,
//     port: parseInt(process.env.SMTP_PORT || "587"),
//     secure: false,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//     tls: {
//       ciphers: "SSLv3",
//     },
//   });

//   try {
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       text: body,
//     });
//     console.log(`Email sent to ${to} with subject "${subject}"`); // Log successful sending
//   } catch (error) {
//     console.error("Error sending email:", error); // Log any errors while sending email
//   }
// });

dbConnection()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`The backend is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
