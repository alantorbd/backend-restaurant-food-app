import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  createResturantController,
  deleteResturantController,
  getAllResturantController,
  getResturantController,
} from "../controllers/resturantControllers.js";

const resturantRouter = express.Router();

resturantRouter.post("/create", verifyToken, createResturantController);
resturantRouter.get("/getAll", getAllResturantController);
resturantRouter.get("/get/:id", getResturantController);
resturantRouter.delete("/delete/:id", verifyToken, deleteResturantController);
export default resturantRouter;
