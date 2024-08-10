const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
} = require("../controllers/job/job.controller");
router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getbyid/:id").get(isAuthenticated, getJobById);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
module.exports = router;
