const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  updateProfile,
  logOut,
} = require("../controllers/auth/user.controller");
const isAuthenticated = require("../middleware/isAuthenticated");
const singleUpload = require("../middleware/multer");

router.route("/register").post(singleUpload, registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOut);

router
  .route("/profile/update/")
  .post(isAuthenticated, singleUpload, updateProfile);

module.exports = router;
