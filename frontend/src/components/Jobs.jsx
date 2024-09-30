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

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import Job from "./Job";
import RecommendedJobs from "./JobRecommendation"; // Import the new component
import Navbar from "./shared/Navbar";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);

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

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20% my-5">
            <FilterCard />
          </div>

          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <div key={job?._id}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Add the RecommendedJobs component */}
        <RecommendedJobs />
      </div>
    </div>
  );
};

export default Jobs;
