import express from "express";
import {
  deleteUserController,
  getUserController,
  resetPasswordController,
  updatePasswordController,
  updateUserController,
} from "../controllers/userControllers.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/getUser", verifyToken, getUserController);
userRouter.put("/updateUser", verifyToken, updateUserController);
userRouter.put("/updatePassword", verifyToken, updatePasswordController);
userRouter.post("/resetPassword", resetPasswordController);
userRouter.delete("/deleteUser/:id", verifyToken, deleteUserController);

export default userRouter;
