import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import { connectDB } from "./config/database";
import authRouter from "./routes/auth";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;


app.use(cookieParser()); // to set cookies
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); // to allow request from this domain
app.use("/api/v1/auth", authRouter); 
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
