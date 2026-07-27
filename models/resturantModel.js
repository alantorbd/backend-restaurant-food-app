import mongoose from "mongoose";

const resturantSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      requred: [true, "Resturant title is required"],
    },
    imageUrl: {
      type: String,
    },
    foods: { type: Array },
    time: {
      type: String,
    },
    pickup: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    logoUrl: {
      type: String,
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
    code: {
      type: String,
    },
    coords: {
      id: String,
      latitude: Number,
      latitudeDelta: Number,
      longitude: Number,
      logitudeDelta: Number,
      address: String,
      title: String,
    },
  },
  { timestamps: true },
);
const resturantModel = mongoose.model("Resturant", resturantSchema);
export default resturantModel;
