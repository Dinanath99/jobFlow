const Job = require("../../models/job.model");

// Controller to get similar jobs by company
const getSimilarJobs = async (req, res) => {
  try {
    const { jobId } = req.params; // Get the job ID from the request parameters

    // Fetch the job to get its company information
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const companyId = job.company;

    // Fetch jobs that belong to the same company, excluding the current job
    const similarJobs = await Job.find({
      company: companyId,
      _id: { $ne: jobId }, // Exclude the current job
    });

    if (!similarJobs.length) {
      return res.status(404).json({
        success: false,
        message: "No similar jobs found for this company",
      });
    }

    // Return the similar jobs
    res.status(200).json({
      success: true,
      message: "Similar jobs fetched successfully",
      jobs: similarJobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching similar jobs.",
      error: error.message,
    });
    console.log(error);
  }
};

module.exports = { getSimilarJobs };
