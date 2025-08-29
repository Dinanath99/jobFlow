const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require("../controllers/company/company.controller");
const singleUpload = require("../middleware/multer");
router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").post(isAuthenticated, singleUpload, updateCompany);
router.route("/delete/:id").delete(isAuthenticated, deleteCompany);

module.exports = router;
