import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {token} = req.cookies 
    
    if (!token) {
      res.status(401).send({ message: "token unavailable" });
      return;
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET! as string
    ) as JwtPayload;
    const userId = decoded._id;
    const user = await User.findById({ _id: userId });
    if (!user) {
      res.status(401).json({ message: "Invalid user, please log in again" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Error authenticating the user" });
  }
};
