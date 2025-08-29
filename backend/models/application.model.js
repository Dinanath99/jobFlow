const mongoose = require("mongoose");


const ApplicationSchema = new mongoose.Schema(
  {
    job: {
      //relation between job and application who is applying for which job
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicant: {
      //who is applying for the job
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);
const Application = mongoose.model("Application", ApplicationSchema);
module.exports = Application;
