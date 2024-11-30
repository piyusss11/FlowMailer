import express from "express";
import { authMiddleware } from "../middlewares/authMiddelware";
import { scheduleEmail } from "../controllers/emailController";

const emailRouter = express.Router();
emailRouter.post("/sendEmail", authMiddleware, scheduleEmail);

export default emailRouter;
