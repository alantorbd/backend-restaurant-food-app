import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  createCatController,
  deleteCatController,
  getAllCatController,
  updateCatController,
} from "../controllers/categoryControllers.js";
const categoryRouter = express.Router();

categoryRouter.post("/create", verifyToken, createCatController);
categoryRouter.get("/getAll", getAllCatController);
categoryRouter.put("/update/:id", verifyToken, updateCatController);
categoryRouter.delete("/delete/:id", verifyToken, deleteCatController);

export default categoryRouter;
