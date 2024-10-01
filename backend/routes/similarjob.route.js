const express = require("express");
const {
  getSimilarJobs,
} = require("../controllers/recommendation/SimilarJob.controller");
const router = express.Router();

router.get("/:jobId", getSimilarJobs);

module.exports = router;
