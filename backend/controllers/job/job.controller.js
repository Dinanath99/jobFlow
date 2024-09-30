const Job = require("../../models/job.model");

//admin post the job
const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
      skills,
    } = req.body;
    const userId = req.id;
    console.log(userId);
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const job = await Job.create({
      title,
      description,
      // requirements: requirements.split(","),
      requirements: requirements,
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
      skills,
    });
    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//job for employee
const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } }, //i for case insensitive search
        { description: { $regex: keyword, $options: "i" } }, //i is used for case insensitive search
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        success: false,
        message: "No jobs found with the given keyword",
      });
    }

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500),
      json({
        success: false,
        message: error.message,
      });
  }
};
//get job by id

const getJobById = async (req, res) => {
  try {
    const jobid = req.params.id;
    if (!jobid) {
      return res.status(400).json({ message: "Please provide job id" });
    }
    const job = await Job.findById(jobid).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
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

//job creted by admin controller
const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    }); //find all jobs created by admin
    if (!jobs) {
      return res.status(404).json({
        success: false,
        message: "No jobs found",
      });
    }
    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
};
