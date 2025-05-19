require("dotenv").config();
const User = require("../../models/user.model");
const OTP = require("../../models/otp.model");
const { hashPassword, comparePassword } = require("../../helper/auth");
const jwt = require("jsonwebtoken");
const path = require("path");
const { profile } = require("console");
const { generateOTP, sendOTPEmail } = require("../../helper/otpservice");

const cloudinary = require("../../utils/cloudinary");
const getDataUri = require("../../utils/datauri");

const registerUser = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

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
      phoneNumber,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    //.save function is used to save the data to the database
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
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please provide email, password, and role",
      });
    }

    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    //if the user found, compare the password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        success: false,
        message: "Please provide the correct role",
      });
    }

    const tokenData = {
      userId: user._id,   
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile, // Ensure the profile object is included
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .json({
        message: `Welcome ${user.fullname}`,
        user,
        success: true,
        token,
      });
  } catch (error) {
    console.log(error);
  }
};

const logOut = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      success: true,
      message: "Logged out successfully",
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

const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file; // Get the file from the request
    let skillsArray;

    // Check if skills were provided
    if (skills) {
      skillsArray = skills.split(","); // Convert string to array
    }

    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Updating user data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skillsArray) user.profile.skills = skillsArray;

    // Handle file upload if a file is provided
    if (file) {
      const fileUri = getDataUri(file); // Use getDataUri to convert the file to a Data URI
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

      // Update resume in profile
      user.profile.resume = cloudResponse.secure_url; // Store the URL in the database
      user.profile.resumeOriginalName = file.originalname; // Store the original name of the file
    }
    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//verify OTP and password

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const employee = await User.findOne({ email });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const OTPCode = generateOTP(6);

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await OTP.findOneAndUpdate(
      { email: email },
      { email: email, otp: OTPCode, expiresAt: expiresAt },
      { upsert: true }
    );

    const emailSent = await sendOTPEmail(
      employee.email,
      employee.name,
      OTPCode
    );
    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: "Error sending OTP",
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP sent to registered email address",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const verifyOTPandResetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Find OTP record by email
    const otpRecord = await OTP.findOne({ email });
    if (!otpRecord) {
      return res.status(404).json({
        success: false,
        message: "OTP not found",
      });
    }

    // Check if the OTP is correct and not expired
    if (otpRecord.otp !== otp || otpRecord.expiresAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // Find employee by email
    const employee = await User.findOne({ email });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Hash the new password before saving
    const hashedPassword = await hashPassword(newPassword);
    employee.password = hashedPassword;
    await employee.save();

    // Remove the OTP record after successful password reset
    await OTP.deleteOne({ email: email });

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logOut,
  updateProfile,
  forgotPassword,
  verifyOTPandResetPassword,
};
