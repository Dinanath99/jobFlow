import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";

const RecommendedJobs = () => {
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user); // Assuming you have user info in Redux store

  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/recommend/recommendations",
          {
            headers: {
              Authorization: `Bearer ${user.token}`, // Add token if required for authentication
            },
          }
        );
        if (response.data.success) {
          setRecommendedJobs(response.data.recommendations);
        }
      } catch (error) {
        console.error("Error fetching recommended jobs:", error);
      }
    };

    if (user) {
      fetchRecommendedJobs();
    }
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Recommended Jobs</h2>
      <div className="grid grid-cols-3 gap-4">
        {recommendedJobs.length > 0 ? (
          recommendedJobs.map((recommendation) => (
            <Job key={recommendation.job._id} job={recommendation.job} />
          ))
        ) : (
          <span>No recommended jobs found</span>
        )}
      </div>
    </div>
  );
};

export default RecommendedJobs;
