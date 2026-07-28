import AppError from "../utils/appError.js";

// eslint-disable-next-line no-unused-vars
const globalErrorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default globalErrorHandler;
