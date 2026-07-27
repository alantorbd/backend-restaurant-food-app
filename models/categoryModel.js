import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, " category title is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShlNRN8upDgt9U7hKwQoySf2eVMpW7Mgfemcux_WixLnRQMKI9F8jZ9ao&s=10",
    },
  },
  { timestamps: true },
);

const categoryModel = mongoose.model("Category", categorySchema);
export default categoryModel;
