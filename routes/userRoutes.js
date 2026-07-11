import express from "express";
import {
  getUserController,
  updateUserController,
} from "../controllers/userControllers.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/getUser", verifyToken, getUserController);
userRouter.put("/updateUser", verifyToken, updateUserController);

export default userRouter;
