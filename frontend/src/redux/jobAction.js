// src/redux/actions/jobActions.js

import axios from "axios";
import { deleteJob as deleteJobAction } from "../redux/jobSlice"; // Adjust the path as necessary

// Action to delete a job
export const deleteJob = (jobId) => async (dispatch) => {
  try {
    await axios.delete(
      `http://localhost:4000/api/v1/jobs/delete/${jobId}`, // Adjust the URL based on your API structure
      {
        withCredentials: true,
      }
    );

    // Dispatch the delete job action
    dispatch(deleteJobAction(jobId));

    // Optionally, you can also fetch the updated jobs list here if needed
  } catch (error) {
    console.error("Error deleting job:", error);
    dispatch({ type: "DELETE_JOB_FAIL", payload: error });
  }
};

// Action to fetch all jobs
export const fetchJobs = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:4000/api/v1/job", {
      withCredentials: true,
    });
    dispatch({ type: "FETCH_JOBS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_JOBS_FAIL", payload: error });
  }
};
