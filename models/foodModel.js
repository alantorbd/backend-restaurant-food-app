import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food Title is required"],
    },
    description: {
      type: String,
      required: [true, "Food Description is required"],
    },
    price: {
      type: Number,
      required: [true, "food price is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShlNRN8upDgt9U7hKwQoySf2eVMpW7Mgfemcux_WixLnRQMKI9F8jZ9ao&s=10",
    },
    foodTags: String,
    category: String,
    code: String,
    isAvailabe: {
      type: Boolean,
      default: true,
    },
    resturant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resturant",
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    ratingCount: String,
  },
  { timestamps: true },
);

const foodModel = mongoose.model("Food", foodSchema);
export default foodModel;
