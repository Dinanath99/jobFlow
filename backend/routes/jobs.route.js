const express = require("express");
const router = express.Router();
const { getAllJobs, createJob } = require("../controllers/jobs");

router.get("/alljobs", getAllJobs);
router.post("/create", createJob);

module.exports = router;
