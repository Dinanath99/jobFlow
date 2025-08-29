const Application = require("../../models/application.model");
const Job = require("../../models/job.model");
const sendEmail = require("../../utils/emailSender");
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


const updateStatus = async (req, res) => {
  try {
    const { status, interviewDate } = req.body; // Added interviewDate
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Please provide status",
      });
    }

    const application = await Application.findOne({
      _id: applicationId,
    }).populate("applicant");
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    // Check if the status is 'accepted' or 'rejected' and send an email
    const applicantEmail = application.applicant.email;
    let subject, text, html;

    if (application.status === "accepted") {
      if (!interviewDate) {
        return res.status(400).json({
          success: false,
          message: "Please provide an interview date",
        });
      }

      subject = "Application Accepted - Interview Scheduled";
      text = `Congratulations! Your application for the job has been accepted. Your interview is scheduled on ${interviewDate}.`;
      html = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <img src="https://raw.githubusercontent.com/Dinanath99/jobflow-logo/refs/heads/main/jobFlow.png" alt="JobFlow Logo" style="max-width: 200px;" />
          <h1 style="color: #4CAF50;">Congratulations!</h1>
          <p style="font-size: 16px;">
            Your application for the job has been accepted. We are excited to invite you for an interview on <strong>${interviewDate}</strong>.
          </p>
          <p style="font-size: 14px;">Please be on time and prepare accordingly. We look forward to seeing you!</p>
          <footer style="margin-top: 20px; font-size: 12px; color: #777;">
            <p>Best regards,</p>
            <p>JobFlow Team</p>
          </footer>
        </div>
      `;
    } else if (application.status === "rejected") {
      subject = "Application Rejected";
      text =
        "We're sorry to inform you that your application has been rejected.";
      html = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <img src="https://raw.githubusercontent.com/Dinanath99/jobflow-logo/refs/heads/main/jobFlow.png" alt="JobFlow Logo" style="max-width: 200px;" />
          <h1 style="color: #F44336;">Application Rejected</h1>
          <p style="font-size: 16px;">
            We're sorry to inform you that your application for the job has been rejected. We appreciate your interest and encourage you to apply for future openings.
          </p>
          <p style="font-size: 14px;">Thank you for your understanding.</p>
          <footer style="margin-top: 20px; font-size: 12px; color: #777;">
            <p>Best regards,</p>
            <p>JobFlow Team</p>
          </footer>
        </div>
      `;
    }

    // Send the email for both accepted and rejected applications
    await sendEmail(applicantEmail, subject, text, html);

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
