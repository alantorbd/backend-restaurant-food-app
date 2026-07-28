import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  createFoodController,
  deleteFoodController,
  getAllFoodController,
  getFoodController,
  orderStatusController,
  placeOrderController,
  updateFoodController,
} from "../controllers/foodControllers.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
const foodRouter = express.Router();

foodRouter.post("/create", verifyToken, createFoodController);
foodRouter.get("/getAll", getAllFoodController);
foodRouter.get("/getByResturant/:id", getFoodController);
foodRouter.put("/update/:id", verifyToken, updateFoodController);
foodRouter.delete("/delete/:id", verifyToken, deleteFoodController);
foodRouter.post("/placeorder", verifyToken, placeOrderController);
foodRouter.post(
  "/orderStatus/:id",
  verifyToken,
  adminMiddleware,
  orderStatusController,
);
export default foodRouter;
