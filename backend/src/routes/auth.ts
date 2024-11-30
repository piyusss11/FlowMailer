import express, { Request, Response } from "express";
import { login, logout, register } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddelware";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/getUser", authMiddleware, (req: Request, res: Response) => {
  res.status(200).json(req.user);
});

export default authRouter;
