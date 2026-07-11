import { userModel } from "../models/userModel.js";

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
