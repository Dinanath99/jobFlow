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
    // Check if the user has already applied for the job
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

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // Push the new application to the job's applications array
    job.applications.push(newApplication._id);
    await job.save();

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
const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id; //get how many applicants have applied for the job
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    //return the applicants
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update status of the application
const updateStatus = async (req, res) => {
  try {
    const {status} = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Please provide status",
      });
    }
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }
    application.status = status.toLowerCase();
    await application.save();
    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  applyJob,
  getAppliedJobs,
  getApplicants,
  updateStatus,
};
