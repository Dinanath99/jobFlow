// routes/jobRoutes.js
const express = require("express");
const {
  recommendJobs,
} = require("../controllers/recommendation/recommend.controller");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

// GET route to fetch recommended jobs for the logged-in user
router.get("/recommendations", isAuthenticated, recommendJobs);

module.exports = router;
