const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter your title"],
    },
    description: {
      type: String,
      required: [true, "Please enter description"],
    },
    requirements: [
      // requirements/skills
      {
        type: String,
      },
    ],

    salary: {
      type: Number,
      required: [true, "Please enter salary"],
    },
    experienceLevel: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: [true, "Please enter location"],
    },
    jobType: {
      type: String,
      required: true,
    },
    position: {
      //how many open positions for this job
      type: Number,
      required: true,
    },
    company: {
      // relation between company and jobs
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;
