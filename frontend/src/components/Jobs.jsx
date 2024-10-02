// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import FilterCard from "./FilterCard";
// import Job from "./Job";
// import Navbar from "./shared/Navbar";

// const Jobs = () => {
//   const { allJobs, searchedQuery } = useSelector((store) => store.job);
//   console.log(allJobs);
//   const [filterJobs, setFilterJobs] = useState([]); // Correct state initialization

//   useEffect(() => {
//     if (searchedQuery) {
//       const filteredjobs = allJobs.filter((job) => {
//         return (
//           job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//           job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//           job.location.toLowerCase().includes(searchedQuery.toLowerCase())
//         );
//       });
//       setFilterJobs(filteredjobs);
//     } else {
//       setFilterJobs(allJobs);
//     }
//   }, [allJobs, searchedQuery]);

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-7xl mx-auto mt-5">
//         <div className="flex gap-5">
//           <div className="w-20% my-5">
//             <FilterCard />
//           </div>

//           {filterJobs.length <= 0 ? (
//             <span>Job not found</span>
//           ) : (
//             <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
//               <div className="grid grid-cols-3 gap-4">
//                 {filterJobs.map((job) => (
//                   <div key={job?._id}>
//                     <Job job={job} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Jobs;

// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import FilterCard from "./FilterCard";
// import Job from "./Job";
// import RecommendedJobs from "./JobRecommendation"; // Import the new component
// import Navbar from "./shared/Navbar";

// const Jobs = () => {
//   const { allJobs, searchedQuery } = useSelector((store) => store.job);
//   const [filterJobs, setFilterJobs] = useState([]);

//   useEffect(() => {
//     if (searchedQuery) {
//       const filteredJobs = allJobs.filter((job) => {
//         return (
//           job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//           job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//           job.location.toLowerCase().includes(searchedQuery.toLowerCase())
//         );
//       });
//       setFilterJobs(filteredJobs);
//     } else {
//       setFilterJobs(allJobs);
//     }
//   }, [allJobs, searchedQuery]);

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-7xl mx-auto mt-5 my-36">
//         <div className="flex gap-5">
//           <div className="w-20% my-5">
//             <FilterCard />
//           </div>

//           {filterJobs.length <= 0 ? (
//             <span>Job not found</span>
//           ) : (
//             <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
//               <div className="grid grid-cols-3 gap-4">
//                 {filterJobs.map((job) => (
//                   <div key={job?._id}>
//                     <Job job={job} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Add the RecommendedJobs component */}
//         <RecommendedJobs />
//       </div>
//     </div>
//   );
// };

//export default Jobs;
// import useGetAllJobs from "@/hooks/useGetAllJobs";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import FilterCard from "./FilterCard";
// import Job from "./Job";
// import RecommendedJobs from "./JobRecommendation"; // Import the new component
// import Navbar from "./shared/Navbar";

// const Jobs = () => {
//   useGetAllJobs();
//   const { allJobs, searchedQuery } = useSelector((store) => store.job);
//   const [filterJobs, setFilterJobs] = useState([]);

//   useEffect(() => {
//     if (searchedQuery) {
//       const filteredJobs = allJobs.filter((job) => {
//         return (
//           job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//           job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//           job.location.toLowerCase().includes(searchedQuery.toLowerCase())
//         );
//       });
//       setFilterJobs(filteredJobs);
//     } else {
//       setFilterJobs(allJobs);
//     }
//   }, [allJobs, searchedQuery]);

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-7xl mx-auto mt-10">
//         <div className="flex gap-2">
//           {/* Left Side: Filters and Job List */}
//           <div className="flex-3 flex gap-5">
//             <div className="w-1/5 my-5">
//               <FilterCard />
//             </div>

//             <div className="w-4/5 h-[100vh] overflow-y-auto pb-5">
//               {filterJobs.length <= 0 ? (
//                 <span>Job not found</span>
//               ) : (
//                 <div className="grid grid-cols-3 gap-2">
//                   {filterJobs.map((job) => (
//                     <div key={job?._id}>
//                       <Job job={job} />
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Side: Job Recommendations */}
//           <div className="w-1/4">
//             <RecommendedJobs />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Jobs;

// import useGetAllJobs from "@/hooks/useGetAllJobs";
// import { setSearchedQuery } from "@/redux/jobSlice";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../redux/authSlice"; // Import the selector
// import FilterCard from "./FilterCard";
// import Job from "./Job";
// import RecommendedJobs from "./JobRecommendation"; // Import the new component
// import Navbar from "./shared/Navbar";
// const Jobs = () => {
//   useGetAllJobs();
//   const dispatch = useDispatch();
//   const { allJobs, searchedQuery } = useSelector((store) => store.job);
//   console.log(allJobs);
//   const isLoggedIn = useSelector(selectIsLoggedIn); // Use the selector to get isLoggedIn
//   //const [filterJobs, setFilterJobs] = useState([]);
//   const [filterJobs, setFilterJobs] = useState(allJobs);
//   useEffect(() => {
//     // Reset or initialize searchedQuery when component mounts
//     dispatch(setSearchedQuery(""));
//   }, []);
//   useEffect(() => {
//     if (searchedQuery) {
//       const filteredJobs = allJobs.filter((job) => {
//         return (
//           job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//           job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//           job.location.toLowerCase().includes(searchedQuery.toLowerCase())
//         );
//       });
//       setFilterJobs(filteredJobs);
//     } else {
//       setFilterJobs(allJobs);
//     }
//   }, [allJobs, searchedQuery]);

//   // Run this when the Jobs component mounts

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-7xl mx-auto mt-10">
//         <div className="flex gap-2">
//           {/* Left Side: Filters and Job List */}
//           <div className="flex-3 flex gap-5">
//             <div className="w-1/5 my-5">
//               <FilterCard />
//             </div>

//             <div className="w-4/5 h-[100vh] overflow-y-auto pb-5">
//               {filterJobs.length <= 0 ? (
//                 <span>Job not found</span>
//               ) : (
//                 <div className="grid grid-cols-3 gap-2">
//                   {filterJobs.map((job) => (
//                     <div key={job?._id}>
//                       <Job job={job} />
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Side: Job Recommendations */}
//           {isLoggedIn && ( // Use isLoggedIn from the selector
//             <div className="w-1/4">
//               <RecommendedJobs />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Jobs;

import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FilterCard from "./FilterCard";
import Job from "./Job";
import RecommendedJobs from "./JobRecommendation";
import Navbar from "./shared/Navbar";
import { selectIsLoggedIn } from "../redux/authSlice";
import { setSearchedQuery } from "../redux/jobSlice"; // Import the action to reset search query

const Jobs = () => {
  const dispatch = useDispatch();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [filterJobs, setFilterJobs] = useState([]);

  // Call useGetAllJobs directly in the component
  useGetAllJobs();

  // Apply search filters whenever allJobs or searchedQuery changes
  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  // Reset search query when navigating back to the jobs page
  useEffect(() => {
    dispatch(setSearchedQuery("")); // Reset the search query when the component mounts
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-10">
        <div className="flex gap-2">
          {/* Left Side: Filters and Job List */}
          <div className="flex-3 flex gap-5">
            <div className="w-1/5 my-5">
              <FilterCard />
            </div>

            <div className="w-4/5 h-[100vh] overflow-y-auto pb-5">
              {filterJobs.length <= 0 ? (
                <span>Job not found</span>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {filterJobs.map((job) => (
                    <div key={job?._id}>
                      <Job job={job} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Job Recommendations */}
          {isLoggedIn && (
            <div className="w-1/4">
              <RecommendedJobs />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
