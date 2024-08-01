const Job = require("../models/Job");

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.createJob = async (req, res) => {
  const { title, description, company, location } = req.body;

  try {
    const newJob = new Job({ title, description, company, location });
    const job = await newJob.save();
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
