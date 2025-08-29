import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// const useGetAllJobs = () => {
//   const dispatch = useDispatch();
//   const { searchedQuery } = useSelector((store) => store.job);
//   useEffect(() => {
//     const fetchAllJobs = async () => {
//       try {
//         const res = await axios.get(
//           `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,
//           {
//             withCredentials: true,
//           }
//         );
//          console.log(res.data.jobs);
//         if (res.data.success) {
//           dispatch(setAllJobs(res.data.jobs));
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchAllJobs();
//   }, [dispatch]);
// };

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, []);
};


export default useGetAllJobs;


// import { setAllJobs } from "@/redux/jobSlice";
// import { JOB_API_END_POINT } from "@/utils/constant";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const useGetAllJobs = () => {
//   const dispatch = useDispatch();
//   const { searchedQuery } = useSelector((store) => store.job);
//   const [loading, setLoading] = useState(false); // Manage loading state

//   useEffect(() => {
//     const fetchAllJobs = async () => {
//       setLoading(true); // Start loading
//       try {
//         const res = await axios.get(
//           `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,
//           {
//             withCredentials: true,
//           }
//         );
//         console.log(res.data.jobs);
//         if (res.data.success) {
//           dispatch(setAllJobs(res.data.jobs));
//         }
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false); // End loading
//       }
//     };

//     fetchAllJobs();
//   }, [dispatch, searchedQuery]); // Include searchedQuery in dependencies

//   return { loading }; // Return loading state if needed
// };

// export default useGetAllJobs;
