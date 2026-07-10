import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Database connection successful on ${mongoose.connection.host}`,
    );
  } catch (err) {
    console.log("DB connection Faild ", err);
  }
};
