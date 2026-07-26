import { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    avatarUrl: String,
    credits: { type: Number, required: true, default: 1, min: 0 },
  },
  { timestamps: true },
);
export const UserModel = model("User", userSchema);
