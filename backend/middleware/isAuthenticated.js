require("dotenv").config();
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookie.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded._id;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = isAuthenticated;
