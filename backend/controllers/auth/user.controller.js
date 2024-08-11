require("dotenv").config();
const User = require("../../models/user.model");
const { hashPassword, comparePassword } = require("../../helper/auth");
const jwt = require("jsonwebtoken");
const path = require("path");
const { profile } = require("console");

const registerUser = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
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

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide email and password",
//       });
//     }
//     const user = await User.findOne({ email }).select("+password");
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "Something is missing",
//       });
//     }
//     const isMatch = await comparePassword(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "incorrect password",
//       });
//     }
//     //check role is recruiter or applicant
//     if (role !== user.role) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide correct role",
//       });
//     }
//     const tokenData = {
//       userId: user._id,
//     };
//     const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });
//     const userResponse = {
//       _id: user._id,
//       fullname: user.fullname,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       role: user.role,
//     };
//     res
//       .status(200)
//       .cookie("token", token, {
//         maxAge: 1 * 24 * 60 * 60 * 1000,
//         httpsOnly: true,
//       })
//       .json({
//         success: true,
//         message: `Welcome ${user.fullname}`,
//         token,
//         user: userResponse,
//       });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body; // Added role here
    console.log(email, password, role);
    if (!email || !password || !role) {
      // Added role check here
      return res.status(400).json({
        success: false,
        message: "Please provide email, password, and role",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }
    // Check role is recruiter or applicant
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
    const userResponse = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    };
    res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .json({
        message: `Welcome ${user.fullname}`,
        user: userResponse,
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
    console.log(fullname);
    const file = req.file;
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(","); //covert string to array
    }
    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    //cloudinary upload

    //updating user data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    await user.save();

    const userResponse = {
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
      data: userResponse,
    });

    //resume section
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { registerUser, loginUser, logOut, updateProfile };
