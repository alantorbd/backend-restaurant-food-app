import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();

//middle-ware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.status(200).send("Hello world!");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
