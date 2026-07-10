import { userModel } from "../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    const { username, email, phone, password, address } = req.body;
    if (!username || !email || !phone || !password) {
      return res.status(500).json({
        success: false,
        message: "Please provide all field",
      });
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).json({
        success: false,
        message: "Email already registerd please porvide new email",
      });
    }

    const user = await userModel.create({
      username,
      email,
      phone,
      address,
      password,
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
      message: "Error in register API",
      error,
    });
  }
};
