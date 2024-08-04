// const express = require("express");
// const router = express.Router();
// const upload = require("../middleware/multer.config");
// const {
//   registerUser,
//   loginUser,
// } = require("../controllers/auth/user.controller");
// router.post("/user/register", upload.single("resume"), registerUser);
// router.get("/user/login", loginUser);
// module.exports = router;

const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer.config"); // Adjust path as necessary
const { registerUser } = require("../controllers/auth/user.controller");

// Use multer middleware to handle 'resume' file field
router.post("/user/register", upload.single("resume"), registerUser);

module.exports = router;
