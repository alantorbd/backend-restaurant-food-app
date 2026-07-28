import mongoose from "mongoose";
import foodModel from "../models/foodModel.js";

export const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailabe,
      resturant,
      rating,
      ratingCount,
    } = req.body;
    if (!title || !description || !price || !resturant) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const food = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailabe,
      resturant,
      rating,
      ratingCount,
    });
    await food.save();
    res.status(201).send({
      success: true,
      message: "Food Create successfully",
      food,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in create food api",
      error,
    });
  }
};

export const getAllFoodController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "No food found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Get all foods successfully",
      totalCount: foods.length,
      foods,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in GET all food api",
      error,
    });
  }
};

export const getFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!mongoose.isValidObjectId(foodId) || !foodId) {
      return res.status(400).send({
        success: false,
        message: "Invalid Id",
      });
    }

    const food = await foodModel.findById(foodId);
    if (!food) {
      res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Get Food Successfully",
      food,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in GET Food api",
      error,
    });
  }
};
