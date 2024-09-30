// import { createSlice } from "@reduxjs/toolkit";
// const jobSlice = createSlice({
//   name: "job",
//   initialState: {
//     allJobs: [],
//     singleJob: null,
//   },
//   reducers: {
//     setAllJobs: (state, action) => {
//       state.allJobs = action.payload;
//     },
//     setSingleJob: (state, action) => {
//       state.singleJob = action.payload;
//     },
//   },
// });

// export const { setAllJobs, setSingleJob } = jobSlice.actions;
// export default jobSlice.reducer;

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
} = jobSlice.actions;
export default jobSlice.reducer;
