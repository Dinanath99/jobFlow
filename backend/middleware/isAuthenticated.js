require("dotenv").config();
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    // Verify token
    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to request object
    req.id = decode.userId;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Invalid token",
      success: false,
    });
  }
};

module.exports = isAuthenticated;
