import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6,
    },
    likedBlogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
