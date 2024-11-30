import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI!;
    if (!mongoUri) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }
    const connect = await mongoose.connect(mongoUri);
    console.log("Connected to the database successfully!");
  } catch (err) {
    console.log("error connecting db-", err);
  }
};
