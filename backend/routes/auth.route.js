const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  updateProfile,
} = require("../controllers/auth/user.controller");
const isAuthenticated = require("../middleware/isAuthenticated");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile/update").patch(isAuthenticated, updateProfile);

module.exports = router;
