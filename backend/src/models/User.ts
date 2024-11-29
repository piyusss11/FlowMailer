import mongoose, { Model } from "mongoose";
import jwt from "jsonwebtoken";
import { IUser } from "../types/user";

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
UserSchema.methods.getJWT = function () {
  const user = this as IUser;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
  return token;
};
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;
