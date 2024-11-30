import { Request, Response } from 'express';
import agenda from '../config/agenda';

export const scheduleEmail = async (req: Request, res: Response) => {
  const { time, email, subject, body } = req.body;

  try {
    await agenda.start();
    await agenda.schedule(time, "send email", { to: email, subject, body });
    res.status(200).json({ message: "Email scheduled successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to schedule email" });
  }
};
