// src/redux/actions/companyActions.js

import axios from "axios";
import { deleteCompany as deleteCompanyAction } from "../redux/companySlice"; // Adjust the path as necessary

export const deleteCompany = (companyId) => async (dispatch) => {
  try {
    await axios.delete(
      `http://localhost:4000/api/v1/company/delete/${companyId}`,
      {
        withCredentials: true,
      }
    );

    // Dispatch the delete company action
    dispatch(deleteCompanyAction(companyId));

    // Optionally, you can also fetch the updated companies list here if needed
  } catch (error) {
    console.error("Error deleting company:", error);
    dispatch({ type: "DELETE_COMPANY_FAIL", payload: error });
  }
};

// companyActions.js

export const fetchCompanies = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:4000/api/v1/company");
    dispatch({ type: "FETCH_COMPANIES_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_COMPANIES_FAIL", payload: error });
  }
};
