const dotenv = require("dotenv");
const User = require("../../models/user.model");
const { hashPassword, comparePassword } = require("../../helper/auth");
const jwt = require("jsonwebtoken");
const path = require("path");

// Register User
// exports.registerUser = async (req, res) => {
//   const {
//     name,
//     email,
//     password,
//     confirmPassword,
//     mobileNumber,
//     gender,
//     role,
//     skills,
//     resume,
//   } = req.body;

//   if (password !== confirmPassword) {
//     return res.status(400).json({
//       success: false,
//       message: "Passwords do not match",
//     });
//   }

//   try {
//     // Hash the password before saving
//     const hashedPassword = await hashPassword(password);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       confirmPassword: hashedPassword, // Don't save plain password, save hashed password instead
//       mobileNumber,
//       gender,
//       role,
//       skills,
//       resume,
//     });

//     res.status(201).json({
//       success: true,
//       data: user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// Register User
// exports.registerUser = async (req, res) => {
//   console.log(req.body);
//   console.log(req.file);
//   const {
//     name,
//     email,
//     password,
//     confirmPassword,
//     mobileNumber,
//     gender,
//     role,
//     skills,
//   } = req.body;

//   const resume = req.file
//     ? {
//         public_id: req.file.filename, // Assuming you save the filename as public_id
//         url: `${req.protocol}://${req.get("host")}/uploads/${
//           req.file.filename
//         }`, // Construct the URL for accessing the file
//       }
//     : null;

//   if (password !== confirmPassword) {
//     return res.status(400).json({
//       success: false,
//       message: "Passwords do not match",
//     });
//   }

//   try {
//     const hashedPassword = await hashPassword(password);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       confirmPassword: hashedPassword,
//       mobileNumber,
//       gender,
//       role,
//       skills: skills.split(",").map((skill) => skill.trim()), // Handle skills array
//       resume,
//     });

//     res.status(201).json({
//       success: true,
//       data: user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// Login User
exports.registerUser = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const {
    name,
    email,
    password,
    confirmPassword,
    mobileNumber,
    gender,
    role,
    skills, // Handle the skills field
  } = req.body;

  const resume = req.file
    ? {
        public_id: req.file.filename, // Assuming you save the filename as public_id
        url: `${req.protocol}://${req.get("host")}/uploads/${
          req.file.filename
        }`, // Construct the URL for accessing the file
      }
    : null;

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  try {
    const hashedPassword = await hashPassword(password);

    let skillsArray = [];

    if (skills) {
      // Check if skills is a string or an array and handle accordingly
      if (typeof skills === "string") {
        skillsArray = skills.split(",").map((skill) => skill.trim());
      } else if (Array.isArray(skills)) {
        skillsArray = skills.map((skill) => skill.trim());
      }
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      mobileNumber,
      gender,
      role,
      skills: skillsArray, // Handle skills array
      resume,
    });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password",
    });
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({
      success: true,
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
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

    // You can add additional logic here to fetch user details if needed
    // For example, you might want to attach the user to req.user or similar

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
