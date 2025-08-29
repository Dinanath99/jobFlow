const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

//hashing the password
const hashPassword = async (password) => {
  try {
    const saltRound = 10;  //salt round use to generate salt for hashing
    const hashedPassword = await bcrypt.hash(password, saltRound);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

//comparing the password

const comparePassword = async (password, hashedPassword) => {
  try {
    if (!password || !hashedPassword) {
      throw new Error("Password or hashed password is missing");
    }

    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing passwords: " + error.message);
  }
};

const checkAdmin = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      throw new Error("Authorization token not found");
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    if (!decoded._id) {
      throw new Error("Invalid user ID in token");
    }

    const currentUser = await Admin.findById(decoded._id);
    if (!currentUser) {
      throw new Error("Admin user not found");
    }
    req.adminId = currentUser._id;

    next();
  } catch (error) {
    console.error("Error in checkAdmin middleware:", error);
    res.status(401).json({ status: "failed", message: error.message });
  }
};

// verify token

const verifyToken = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token not found",
    });
  }
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    req.userId = decoded._id;

    const admin = await Admin.findById(decoded._id);
    if (admin) {
      req.user = admin;
      req.isAdmin = true;
      return next();
    }

    const employee = await Employee.findById(decoded._id);
    if (employee) {
      req.user = employee;
      req.isEmployee = true;
      return next();
    }

    if (decoded.role === "superadmin") {
      const superadmin = await Superadmin.findOne({});
      req.user = superadmin;
      req.isSuperadmin = true;

      return next();
    }

    return res.status(400).json({
      success: false,
      message: "The token id is not superadmin, admin or employee",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  checkAdmin,
  verifyToken,
};
