import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  createFoodController,
  getAllFoodController,
  getFoodController,
} from "../controllers/foodControllers.js";
const foodRouter = express.Router();

foodRouter.post("/create", verifyToken, createFoodController);
foodRouter.get("/getAll", getAllFoodController);
foodRouter.get("/get/:id", getFoodController);
export default foodRouter;
