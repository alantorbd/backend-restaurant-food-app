import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { username, email, phone, password, address, answer } = req.body;
    if (!username || !email || !phone || !password || !answer) {
      return res.status(400).json({
        success: false,
        message: "Please provide all field",
      });
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already registerd please porvide new email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    });

    res.status(201).json({
      success: true,
      message: "Successfully registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Password is incorrect",
      });
    }
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error In Login API",
      error,
    });
  }
};
