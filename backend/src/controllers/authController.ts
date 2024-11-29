import { Response, Request } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(200).json({ message: "user created succesfully", user });
    return;
  } catch (err) {
    res.status(400).json({ error: "Unable to register, please try again " });
    return;
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    const token = user.getJWT();
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none", // Allow cross-site requests
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
      path: "/",
    });
    const cookies = res.get("Set-Cookie");
    console.log("Response Cookies:", cookies);
    res.status(200).json({ message: "login succesfully", user });
    return;
  } catch (err) {
    res.status(500).json({ message: "error loggin in, please try again" });
    return;
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie("token", {
    path: "/",
    sameSite: "none",
    secure: true,
    httpOnly: true,
  });
  const cookies = res.get("Set-Cookie"); // Get the "Set-Cookie" headers
  console.log("Response Cookies:", cookies);
  res.status(200).json({ message: "logout succesfully" });
  return;
};
