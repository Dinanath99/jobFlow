import { setSimilarJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSimilarJobs = (jobId) => {
  const dispatch = useDispatch();

  const fetchSimilarJobs = async () => {
    if (!jobId) return; // Return early if jobId is not provided
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/similarjob/${jobId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.data.success) {
        dispatch(setSimilarJobs(response.data.jobs));
      }
    } catch (error) {
      console.error(error); // Use console.error for errors
      throw error; // Rethrow the error to handle it in the component
    }
  };

  useEffect(() => {
    fetchSimilarJobs();
  }, [jobId]);

  return { fetchSimilarJobs }; // Ensure the function is returned
};

export default useGetSimilarJobs;
