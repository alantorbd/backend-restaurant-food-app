// eslint-disable-next-line no-unused-vars
const globalErrorHandler = (error, req, res, next) => {
  res.status(error.statusCode || 500).send({
    success: false,
    message: error.message || "Internal Server error",
  });
};

export default globalErrorHandler;
