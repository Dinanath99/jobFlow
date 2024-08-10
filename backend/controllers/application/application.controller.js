const Application = require("../../models/application.model");
const Job = require("../../models/job.model");
const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res
        .status(400)
        .json({ success: false, message: "Job id is required" });
    }
    //check if the user has already applied for the job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    //check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    //create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    Job.applicantions.push(newApplication._id);
    await Job.save();
    res.status(200).json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createAt: -1 } },
        },
      });
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "No applications found",
      });
    }
    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//admin can view how many users have applied for the job
module.exports = {
  applyJob,
  getAppliedJobs,
};
