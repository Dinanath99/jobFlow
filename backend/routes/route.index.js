const express = require("express");
const router = express.Router();
const authRouter = require("./auth.route");
const companyRouter = require("./company.route");
router.use("/auth", authRouter).use("/company", companyRouter);
module.exports = router;
