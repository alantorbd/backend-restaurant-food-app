import mongoose from "mongoose";
import categoryModel from "../models/categoryModel.js";

export const createCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      return res.status(400).send({
        success: false,
        message: "Please provide category title",
      });
    }
    const category = new categoryModel({
      title,
      imageUrl,
    });

    await category.save();
    res.status(201).send({
      success: true,
      message: "Category Created Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Category api",
    });
  }
};

export const getAllCatController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "There are not found any category",
      });
    }
    res.status(200).send({
      success: true,
      message: "Get all Categories successfully",
      totalCount: categories.length,
      categories,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Get All Categories api",
      error,
    });
  }
};

export const updateCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title && !imageUrl) {
      return res.status(400).send({
        success: false,
        message: "Please provide title or imageUrl",
      });
    }
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid category id",
      });
    }
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true },
    );
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found!",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category Update successfully",
      updatedCategory: category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Problem in update Category api",
      error,
    });
  }
};
export const deleteCatController = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid category id",
      });
    }
    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found!",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category Delete successfully",
      updatedCategory: category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Problem in Delete Category api",
      error,
    });
  }
};
