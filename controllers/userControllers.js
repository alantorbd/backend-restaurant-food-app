import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id, { password: 0 });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "User get Successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Get User API",
      error,
    });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const { username, address, phone } = req.body;
    if (username) user.username = username;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    await user.save();
    res.status(200).send({
      success: true,
      message: "User Update Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Update User API",
      error,
    });
  }
};

export const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Old Password or New Password not found",
      });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Password is not match",
      });
    }
    const hasshedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hasshedPassword;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Password update successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Update Password API",
      error,
    });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found or invalid answer",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Reset Password API",
      error,
    });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid user ID",
      });
    }

    const isDelete = await userModel.findByIdAndDelete(req.params.id);
    if (!isDelete) {
      return res.status(400).send({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Your account has been deleted",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Delete User API",
      error,
    });
  }
};
