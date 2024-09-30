const Job = require("../../models/job.model"); // Assuming you have a job model
const User = require("../../models/user.model");

// Helper function to get the similarity between user and job
const calculateCosineSimilarity = (userSkills, jobSkills) => {
  const skillsSet = new Set([...userSkills, ...jobSkills]);

  const userVector = [];
  const jobVector = [];

  // Create binary vectors for user and job skills
  skillsSet.forEach((skill) => {
    userVector.push(userSkills.includes(skill) ? 1 : 0);
    jobVector.push(jobSkills.includes(skill) ? 1 : 0);
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
  return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0; // returns 0 if either vector has a magnitude of 0
};

const recommendJobs = async (req, res) => {
  try {
    const userId = req.id; // Assuming user is authenticated, and we have userId from token
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userSkills = user.profile.skills || [];

    // Get all jobs
    const jobs = await Job.find();

    // Create an array to store jobs with similarity scores
    const jobRecommendations = jobs.map((job) => {
      const jobSkills = job.skills || [];
      const similarityScore = calculateCosineSimilarity(userSkills, jobSkills);

      return {
        job,
        similarityScore,
      };
    });

    // Sort jobs by similarity score (descending order)
    const sortedJobs = jobRecommendations.sort(
      (a, b) => b.similarityScore - a.similarityScore
    );

    // Return the top 5 job recommendations, including similarity scores
    res.status(200).json({
      success: true,
      message: "Job recommendations fetched successfully",
      recommendations: sortedJobs.slice(0, 5).map((recommendation) => ({
        job: recommendation.job,
        similarityScore: recommendation.similarityScore, // Include similarity score
      })),
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
