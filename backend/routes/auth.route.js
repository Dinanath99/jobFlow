const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  updateProfile,
  logOut,
} = require("../controllers/auth/user.controller");
const isAuthenticated = require("../middleware/isAuthenticated");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOut);

router.route("/profile/update/").post(isAuthenticated, updateProfile);

module.exports = router;
