import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },

    address: {
      type: Array,
    },

    phone: {
      type: String,
      required: [true, "phone number is required"],
    },

    usertype: {
      type: String,
      required: [true, "user type is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },

    profile: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNkNDJa33dRFufXkYcBvnmZAWT7KZxr9NZ6kf_ZPHu7A&s=10",
    },
  },
  { timestamps: true },
);

export const userModel = mongoose.model("User", userSchema);
