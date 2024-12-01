import { Request, Response } from "express";
import nodemailer from "nodemailer";
import agenda from "../config/agenda";

export const scheduleEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { time, email, subject, body } = req.body;
    console.log({ time, email, subject, body });

    if (!time || !email || !subject || !body) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const scheduledTime = new Date(Date.now() + 60 * 60 * 1000);
    await agenda.schedule(scheduledTime || time, "send-email", {
      to: email,
      subject,
      body,
    });
    console.log(`Email scheduled for ${email} at ${scheduledTime}`); // Log if email scheduling happens
    res.status(200).json({ message: "Email scheduled successfully" });
  } catch (error) {
    console.error("Error scheduling email:", error);
    res.status(500).json({ error: "Failed to schedule email" });
  }
};

export const sendEmailNow = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { to, subject, body } = req.body;
  console.log({ to, subject, body });
  const transporter = nodemailer.createTransport({
    secure: false,
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: body,
    });
    console.log(`Email sent to ${to} with subject "${subject}"`); // Log successful sending
  } catch (err) {
    console.error("Error sending email:", err); // Log any errors while sending email
  }
};
