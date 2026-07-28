import mongoose from "mongoose";
import foodModel from "../models/foodModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/appError.js";
import orderModel from "../models/orderModel.js";

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
    const resturantId = req.params.id;
    if (!mongoose.isValidObjectId(resturantId) || !resturantId) {
      return res.status(400).send({
        success: false,
        message: "Invalid Resturant Id",
      });
    }

    const foods = await foodModel.find({ resturant: resturantId });
    if (foods.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Get Food Successfully",
      foods,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in GET Food api",
      error,
    });
  }
};

export const updateFoodController = asyncHandler(async (req, res) => {
  const foodId = req.params.id;
  if (!foodId || !mongoose.isValidObjectId(foodId)) {
    throw new AppError("Invalid food ID", 400);
  }
  const food = await foodModel.findById(foodId);
  if (!food) {
    throw new AppError("Food not found", 404);
  }
  if (!req.body) {
    throw new AppError("Body not include", 400);
  }
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
  } = req.body;

  const updatedFood = await foodModel.findByIdAndUpdate(
    foodId,
    {
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
    },
    { new: true },
  );

  res.status(200).send({
    success: true,
    message: "Food item was updted",
    updatedFood,
  });
});

export const deleteFoodController = asyncHandler(async (req, res) => {
  const foodId = req.params.id;
  if (!foodId || !mongoose.isValidObjectId(foodId)) {
    throw new AppError("Invalid Food ID", 400);
  }
  const deletedFood = await foodModel.findByIdAndDelete(foodId);
  if (!deletedFood) {
    throw new AppError("Food not found", 404);
  }
  res.status(200).send({
    success: true,
    message: "Delete Food Successfully",
    deletedFood,
  });
});

export const placeOrderController = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  console.log(cart);
  if (!cart) {
    throw new AppError("please provide food cart or payment method");
  }
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  const newOrder = new orderModel({
    foods: cart,
    payment: totalPrice,
    buyer: req.user.id,
  });
  await newOrder.save();
  res.status(201).send({
    success: true,
    message: "Order Created Successfully",
    order: newOrder,
  });
});

export const orderStatusController = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  if (!orderId || !mongoose.isValidObjectId(orderId)) {
    throw new AppError("Invalid ID", 400);
  }
  const { status } = req.body;
  const order = await orderModel.findByIdAndUpdate(
    orderId,
    { status },
    { new: true },
  );
  res.status(200).send({
    success: true,
    message: "Status update successfully",
    order,
  });
});
