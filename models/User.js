import { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      // you cant have two user with same email
      unique: true,
    },
    bestAnime: {
      type: String,
      required: true,
      trim: true,
    },
    animationStyle: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);
const User = model("user", userSchema);
export default User;
