import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [], // initial state of allJobs
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
    jobRecommendations: [],
    similarJobs: [],
  },
  reducers: {
    // actions
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setallAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    setJobRecommendations: (state, action) => {
      state.jobRecommendations = action.payload; // Store job recommendations
    },
    setSimilarJobs: (state, action) => {
      state.similarJobs = action.payload; // Store similar jobs
    },
    deleteJob: (state, action) => {
      const jobId = action.payload;
      state.allAdminJobs = state.allAdminJobs.filter(
        (job) => job._id !== jobId
      );
    },
  },
});
export const {
  setAllJobs,
  setSingleJob,
  setallAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
  setJobRecommendations,
  setSimilarJobs,
  deleteJob,
} = jobSlice.actions;
export default jobSlice.reducer;
