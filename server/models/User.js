import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please Enter your first name"],
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: [true, "Please Enter your last name"],
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: [true, "Please Enter your email id"],
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter your password"],
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "User",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
