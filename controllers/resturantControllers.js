import mongoose from "mongoose";
import resturantModel from "../models/resturantModel.js";

export const createResturantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    if (!title || !coords) {
      return res.status(400).send({
        success: false,
        message: "Please provide title and address",
      });
    }
    const newResturant = new resturantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newResturant.save();
    res.status(201).send({
      success: true,
      message: "Resturant Created Successfully",
      newResturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Resturant api",
    });
  }
};

export const getAllResturantController = async (req, res) => {
  try {
    const resturants = await resturantModel.find({});
    if (!resturants) {
      return res.status(404).send({
        success: false,
        message: "There are not found any resturant",
      });
    }
    res.status(200).send({
      success: true,
      message: "Get all Resturenat successfully",
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Get All Resturant api",
      error,
    });
  }
};

export const getResturantController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Resturant ID",
      });
    }
    const resturant = await resturantModel.findById(id);
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "Resturant not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Resturant get Successfully",
      resturant,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Get Resturant api",
      error,
    });
  }
};
export const deleteResturantController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Resturant ID",
      });
    }
    const resturant = await resturantModel.findByIdAndDelete(id);
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "Resturant not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Resturant Delete Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Delete Resturant api",
      error,
    });
  }
};
