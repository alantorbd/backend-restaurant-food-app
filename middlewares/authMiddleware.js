import JWT from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired token",
        });
      }

      req.user = decoded; // { id: ... }

      next();
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Auth API",
      error,
    });
  }
};
