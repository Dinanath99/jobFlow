// import useGetAllJobs from "@/hooks/useGetAllJobs";
// import { setSearchedQuery } from "@/redux/jobSlice";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Job from "./Job";
 //import Navbar from "./shared/Navbar";

// const Browse = () => {
//   useGetAllJobs();
//   const { allJobs } = useSelector((store) => store.job);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     return () => {
//       dispatch(setSearchedQuery(""));
//     };
//   }, []);
//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-7xl mx-auto my-28">
//         <h1 className="font-bold text-xl my-10">
//           Search Results ({allJobs.length})
//         </h1>
//         <div className="grid grid-cols-3 gap-4">
//           {allJobs.map((job) => {
//             return <Job key={job.id} job={job} />;
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Browse;



import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import Navbar from "./shared/Navbar";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  // Filter, Sort, Pagination and Modal State
  const [filter, setFilter] = useState({ type: "", location: "" });
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;
  const [selectedJob, setSelectedJob] = useState(null); // Modal state

  // Reset search query on unmount
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  // Pagination calculations
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  // Filter and sort jobs
  const filteredJobs = allJobs
    .filter(
      (job) =>
        (filter.type ? job.jobType === filter.type : true) &&
        (filter.location
          ? job.location.toLowerCase().includes(filter.location.toLowerCase())
          : true)
    )
    .sort((a, b) => {
      if (sort === "date") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sort === "salary") return b.salary - a.salary;
      return 0;
    });

  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Pagination handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-28">
        <h1 className="font-bold text-xl my-10">
          Search Results ({filteredJobs.length})
        </h1>

        {/* Filter and Sort Section */}
        <div className="filter-sort-section flex justify-between mb-4">
          <div className="filter flex gap-4">
            <select
              className="border p-2"
              onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            >
              <option value="">All Types</option>
              <option value="Full time">Full-Time</option>
              <option value="Part time">Part-Time</option>
            </select>
            <input
              className="border p-2"
              type="text"
              placeholder="Location"
              onChange={(e) =>
                setFilter({ ...filter, location: e.target.value })
              }
            />
          </div>
          <div className="sort">
            <select
              className="border p-2"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="date">Sort by Date</option>
              <option value="salary">Sort by Salary</option>
            </select>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-3 gap-4">
          {currentJobs.map((job) => {
            return (
              <Job
                key={job.id}
                job={job}
                onClick={() => setSelectedJob(job)} // Open Modal
              />
            );
          })}
        </div>

        {/* Pagination */}
        <div className="pagination mt-10 flex justify-center gap-4">
          <button
            className="border px-4 py-2"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="font-bold">{currentPage}</span>
          <button
            className="border px-4 py-2"
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastJob >= filteredJobs.length}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal for Job Preview */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-full">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-3 right-3 text-black font-bold"
            >
              X
            </button>
            <h1 className="text-xl font-bold">{selectedJob.title}</h1>
            <p>{selectedJob.description}</p>
            <div className="flex gap-4 mt-4">
              <span className="font-bold">Location:</span>
              <span>{selectedJob.location}</span>
            </div>
            <div className="flex gap-4 mt-4">
              <span className="font-bold">Salary:</span>
              <span>{selectedJob.salary}</span>
            </div>
            <div className="flex gap-4 mt-4">
              <span className="font-bold">Job Type:</span>
              <span>{selectedJob.jobType}</span>
            </div>
            <button
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => alert(`Applied to ${selectedJob.title}`)}
            >
              Apply Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Browse;
