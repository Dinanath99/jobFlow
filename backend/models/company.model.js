const mongoose = require("mongoose");
const validator = require("validator");
const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your company name"],
      unique: true,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    logo: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const Company = mongoose.model("Company", companySchema);
module.exports = Company;
