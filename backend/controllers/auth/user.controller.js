const dotenv = require("dotenv");
const User = require("../../models/user.model");
const { hashPassword, comparePassword } = require("../../helper/auth");
const jwt = require("jsonwebtoken");
const path = require("path");

const registerUser = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, confirmPassword, role } =
      req.body;
    if (
      !fullname ||
      !email ||
      !phoneNumber ||
      !password ||
      confirmPassword ||
      !role
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      phoneNumber,
      role,
    });

    newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Something is missing",
      });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "incorrect password",
      });
    }
    //check role is recruiter or applicant
    if (role !== user.role) {
      return res.status(400).json({
        success: false,
        message: "Please provide correct role",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const userResponse = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    };
    res
      .status(200)
      .cookie("token", token, { maxAge: 1 * 24 * 60 * 1000, httpOnly: true })
      .json({
        success: true,
        message: `Welcome ${user.fullname}`,
        token,
        user: userResponse,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Middleware to verify token (for protected routes)
exports.verifyToken = async (req, res, next) => {
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

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = { registerUser };
