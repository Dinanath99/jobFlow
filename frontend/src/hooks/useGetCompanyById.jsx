// import { setSingleCompany } from "@/redux/companySlice";
// import { COMPANY_API_END_POINT } from "@/utils/constant";
// import axios from "axios";
// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";

// const useGetCompanyById = (companyId) => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchSingleCompany = async () => {
//       try {
//         console.log("Fetching company with ID:", companyId);
//         const res = await axios.get(
//           `${COMPANY_API_END_POINT}/get/${companyId}`,
//           {
//             withCredentials: true,
//           }
//         );
//         console.log("API response for single company:", res.data);
//         if (res.data.success) {
//           dispatch(setSingleCompany(res.data.company));
//         }
//       } catch (error) {
//         console.error("Error fetching company by ID:", error);
//       }
//     };
//     fetchSingleCompany();
//   }, [companyId, dispatch]);
// };

// export default useGetCompanyById;

import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  const fetchSingleCompany = useCallback(async () => {
    try {
      console.log("Fetching company with ID:", companyId);
      const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
        withCredentials: true,
      });
      console.log("API response for single company:", res.data);
      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
      }
    } catch (error) {
      console.error("Error fetching company by ID:", error);
    }
  }, [companyId, dispatch]);

  useEffect(() => {
    if (companyId) {
      fetchSingleCompany();
    }
  }, [companyId, fetchSingleCompany]);
};

export default useGetCompanyById;
