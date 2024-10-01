import useGetSimilarJobs from "@/hooks/useGetSimilarJobs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const SimilarJobs = () => {
  const params = useParams();
  const jobId = params.id;
  const navigate = useNavigate();

  const handleApplyClick = (jobId) => {
    navigate(`/description/${jobId}`);
  };

  const similarJobs = useSelector((store) => store.job.similarJobs) || [];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { fetchSimilarJobs } = useGetSimilarJobs(jobId);

  useEffect(() => {
    const loadSimilarJobs = async () => {
      setLoading(true);
      try {
        await fetchSimilarJobs();
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching similar jobs");
      } finally {
        setLoading(false);
      }
    };

    loadSimilarJobs();
  }, [fetchSimilarJobs]);

  useEffect(() => {
    if (similarJobs.length > 0) {
      setLoading(false);
    }
  }, [similarJobs]);

  if (loading) return <p>Loading similar jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-auto justify-center">
      <h1 className="font-bold text-lg my-5 col-span-full text-center">
        Similar Jobs by the Same Company
      </h1>
      {similarJobs.length > 0 ? (
        similarJobs.map((job) => (
          <div
            key={job._id}
            className=" w-36 bg-white shadow-lg rounded-lg p-5 transition-transform transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold text-purple-600 hover:text-purple-700 transition-colors">
              {job.title}
            </h2>
            <p className="text-gray-600 mt-2 mr-24">{job.description}</p>
            <div className="flex justify-between mt-4">
              <span className="text-sm text-gray-500">{job.location}</span>
              <span className="text-sm text-gray-500">
                Salary:{" "}
                <span className="font-bold text-purple-600">${job.salary}</span>
              </span>
            </div>
            <button
              onClick={() => handleApplyClick(job._id)}
              className="mt-4 w-full rounded-full px-4 py-2 text-white font-semibold bg-purple-600 hover:bg-purple-700 transition duration-300 shadow-lg"
            >
              Apply
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500 col-span-full text-center">
          No similar jobs found.
        </p>
      )}
    </div>
  );
};

export default SimilarJobs;
