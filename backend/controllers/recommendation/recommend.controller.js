const Job = require("../../models/job.model");
const User = require("../../models/user.model");

// Helper function to calculate cosine similarity
const calculateCosineSimilarity = (userSkills, jobRequirements) => {
  const skillsSet = new Set([...userSkills, ...jobRequirements]);

  const userVector = [];
  const jobVector = [];

  // Create binary vectors for user and job skills
  skillsSet.forEach((skill) => {
    userVector.push(userSkills.includes(skill) ? 1 : 0);
    jobVector.push(jobRequirements.includes(skill) ? 1 : 0);
  });

  // Calculate the dot product and magnitudes
  const dotProduct = userVector.reduce(
    (sum, value, index) => sum + value * jobVector[index],
    0
  );
  const magnitudeA = Math.sqrt(
    userVector.reduce((sum, value) => sum + value * value, 0)
  );
  const magnitudeB = Math.sqrt(
    jobVector.reduce((sum, value) => sum + value * value, 0)
  );

  // Return the cosine similarity
  return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
};


const recommendJobs = async (req, res) => {
  try {
    const userId = req.id; // Assuming user is authenticated
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userSkills = user.profile.skills || []; // Get user skills
    const userLocation = user.profile.location || ""; // Get user location
    const preferredJobType = user.profile.jobType || ""; // Get user's preferred job type

    // Fetch jobs with filtering options (optional filters for location, jobType)
    const jobs = await Job.find({
      ...(userLocation ? { location: userLocation } : {}),
      ...(preferredJobType ? { jobType: preferredJobType } : {}),
    });

    if (!jobs.length) {
      return res.status(404).json({
        success: false,
        message: "No jobs found based on your preferences",
      });
    }

    // Create an array to store jobs with similarity scores
    const jobRecommendations = jobs.map((job) => {
      // Split the requirements string into an array
      const jobRequirements = job.requirements[0]
        ? job.requirements[0].split(",")
        : [];
      const similarityScore = calculateCosineSimilarity(
        userSkills,
        jobRequirements
      );

      return {
        job,
        similarityScore,
      };
    });

    // Sort jobs by similarity score (descending order)
    const sortedJobs = jobRecommendations
      .filter((recommendation) => recommendation.similarityScore > 0) // Filter out jobs with zero similarity
      .sort((a, b) => b.similarityScore - a.similarityScore);

    // Paginate the results
    const limit = parseInt(req.query.limit, 10) || 5;
    const page = parseInt(req.query.page, 10) || 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedResults = sortedJobs.slice(startIndex, endIndex);

    // Return the job recommendations along with pagination info
    res.status(200).json({
      success: true,
      message: "Job recommendations fetched successfully",
      recommendations: paginatedResults.map((recommendation) => ({
        job: recommendation.job,
        similarityScore: recommendation.similarityScore,
      })),
      pagination: {
        totalJobs: sortedJobs.length,
        currentPage: page,
        totalPages: Math.ceil(sortedJobs.length / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching job recommendations.",
      error: error.message,
    });
    console.log(error);
  }
};

module.exports = { recommendJobs };
