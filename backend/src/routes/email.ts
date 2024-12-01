import express, { Request,Response } from "express";
import { authMiddleware } from "../middlewares/authMiddelware";
import { scheduleEmail, sendEmailNow } from "../controllers/emailController";

const emailRouter = express.Router();
emailRouter.post("/sendEmail", authMiddleware, scheduleEmail);
emailRouter.post("/sendEmailNow", authMiddleware, sendEmailNow);


export default emailRouter;
