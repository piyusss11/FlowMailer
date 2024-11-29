import mongoose, { Document } from "mongoose";

export interface IUser extends Document{
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    getJWT: () => string;
  }