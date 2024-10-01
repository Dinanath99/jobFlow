// import { createSlice } from "@reduxjs/toolkit";

// const companySlice = createSlice({
//   name: "company",
//   initialState: {
//     singleCompany: null,
//     companies: [],
//     searchCompanyByText: "",
//   },
//   reducers: {
//     //actions
//     setSingleCompany: (state, action) => {
//       state.singleCompany = action.payload;
//     },
//     setCompanies: (state, action) => {
//       state.companies = action.payload;
//     },
//     setSearchCompanyByText: (state, action) => {
//       state.searchCompanyByText = action.payload;
//     },
//   },
// });

// export const { setSingleCompany, setCompanies,setSearchCompanyByText } = companySlice.actions;
// export default companySlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies: [],
    searchCompanyByText: "",
  },
  reducers: {
    // actions
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    },
    deleteCompany: (state, action) => {
      state.companies = state.companies.filter(
        (company) => company.id !== action.payload
      );
    },
  },
});
export const {
  setSingleCompany,
  setCompanies,
  setSearchCompanyByText,
  deleteCompany,
} = companySlice.actions;
export default companySlice.reducer;
