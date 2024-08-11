const express = require("express");
const router = express.Router();
const authRouter = require("./auth.route");
const companyRouter = require("./company.route");
const jobRouter = require("./jobs.route");
const applicationRouter = require("./application.route");
router
  .use("/auth", authRouter)
  .use("/company", companyRouter)
  .use("/jobs", jobRouter)
  .use("/application", applicationRouter);
module.exports = router;
