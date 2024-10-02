const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
  deleteJob,
  updateJob,
} = require("../controllers/job/job.controller");
router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(getAllJobs);
router.route("/getbyid/:id").get(isAuthenticated, getJobById);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/delete/:id").delete(isAuthenticated, deleteJob);
router.route("/update/:id").post(isAuthenticated, updateJob);
module.exports = router;
