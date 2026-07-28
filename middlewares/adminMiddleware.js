import { userModel } from "../models/userModel.js";
import AppError from "../utils/appError.js";
import asyncHandler from "../utils/asyncHandler.js";

const adminMiddleware = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user.id);
  if (user.usertype !== "admin") {
    throw new AppError("Only admin can Access", 401);
  } else {
    next();
  }
});

export default adminMiddleware;
