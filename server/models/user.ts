import * as mongoose from "mongoose";
import { Document } from "mongoose";

import { IUser, UserEnum } from "./constant";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: UserEnum,
    email: { type: String, unique: true, required: true },
    password: { type: String, minlength: 6, required: true },
    dob: { type: String, required: true }
  },
  { timestamps: true }
);

const User = mongoose.model<IUser & Document>("users", userSchema);

export default User;
