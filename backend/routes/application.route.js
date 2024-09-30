const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  applyJob,
  getAppliedJobs,
  getApplicants,
  updateStatus,
} = require("../controllers/application/application.controller");
router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/getAppliedJobs").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

module.exports = router;
