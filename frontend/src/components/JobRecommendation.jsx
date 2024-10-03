// import useGetJobRecommendations from "@/hooks/useGetJobRecommendations";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// const JobRecommendation = () => {
//   useGetJobRecommendations();

//   // Get job recommendations from Redux store
//   const jobRecommendations = useSelector(
//     (state) => state.job.jobRecommendations
//   );

//   console.log("Job Recommendations from Redux:", jobRecommendations); // Log the recommendations

//   // Initialize the useNavigate hook
//   const navigate = useNavigate();

//   const handleApplyClick = (jobId) => {
//     navigate(`/description/${jobId}`); // Navigate to the job description page
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white rounded-2xl my-20 p-5 shadow-md">
//       <h1 className="font-bold text-lg my-5">You Might Like These Jobs</h1>{" "}
//       {/* Example caption */}
//       {/* Check if jobRecommendations is defined and has items */}
//       {Array.isArray(jobRecommendations) && jobRecommendations.length > 0 ? (
//         jobRecommendations.map((item) => (
//           <div key={item.job._id} className="border-b py-4">
//             <h2 className="text-xl font-semibold">{item.job.title}</h2>
//             <p className="text-gray-600">{}</p>
//             <div className="flex justify-between mt-2">
//               <span className="text-sm text-gray-500">{item.job.location}</span>
//               <span className="text-sm text-gray-500">
//                 Salary: ${item.job.salary}
//               </span>
//             </div>
//             <button
//               onClick={() => handleApplyClick(item.job._id)} // Call the function on click
//               className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
//             >
//               Apply Now
//             </button>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-500">No job recommendations available.</p>
//       )}
//     </div>
//   );
// };

// export default JobRecommendation;

// import useGetAllJobs from "@/hooks/useGetAllJobs";
// import useGetJobRecommendations from "@/hooks/useGetJobRecommendations";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// const JobRecommendation = () => {
//   useGetJobRecommendations();

//   // Get job recommendations from Redux store
//   const jobRecommendations = useSelector(
//     (store) => store.job.jobRecommendations
//   );

//   console.log("Job Recommendations from Redux:", jobRecommendations); // Log the recommendations

//   // Initialize the useNavigate hook
//   const navigate = useNavigate();

//   const handleApplyClick = (jobId) => {
//     navigate(`/description/${jobId}`); // Navigate to the job description page
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white rounded-2xl my-20 p-5 shadow-lg">
//       <h1 className="font-bold text-lg my-5">You Might Like These Jobs</h1>
//       {/* Check if jobRecommendations is defined and has items */}
//       {Array.isArray(jobRecommendations) && jobRecommendations.length > 0 ? (
//         jobRecommendations.map((item) => (
//           <div key={item.job._id} className="border-b py-4 last:border-b-0">
//             <div className="flex items-start justify-between">
//               <div className="flex flex-col">
//                 <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition duration-200 ease-in-out cursor-pointer">
//                   {item.job.title}
//                 </h2>
//                 <p className="text-gray-600">{}</p>
//                 <p className="text-gray-500 text-sm">{item.job.location}</p>
//                 <div className="flex items-center mt-1">
//                   <span className="text-sm text-gray-500">
//                     Salary: ${item.job.salary}
//                   </span>
//                 </div>
//               </div>
//               <button
//                 onClick={() => handleApplyClick(item.job._id)} // Call the function on click
//                 className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
//               >
//                 Apply Now
//               </button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-500">No job recommendations available.</p>
//       )}
//     </div>
//   );
// };

// export default JobRecommendation;
import useGetJobRecommendations from "@/hooks/useGetJobRecommendations";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Button } from "./ui/button";
const JobRecommendation = () => {
  useGetJobRecommendations();

  // Get job recommendations from Redux store
  const jobRecommendations = useSelector(
    (store) => store.job.jobRecommendations
  );

  console.log("Job Recommendations from Redux:", jobRecommendations); // Log the recommendations

  // Initialize the useNavigate hook
  const navigate = useNavigate();

  const handleApplyClick = (jobId) => {
    navigate(`/description/${jobId}`); // Navigate to the job description page
  };

  return (
    <div className="max-w-2xl mx-auto my-20">
      {/* Only render the card structure if jobRecommendations exists and has items */}
      {Array.isArray(jobRecommendations) && jobRecommendations.length > 0 ? (
        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <h1 className="font-bold text-lg my-5">You Might Like These Jobs</h1>
          {jobRecommendations.map((item) => (
            <div key={item.job._id} className="border-b py-4 last:border-b-0">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition duration-200 ease-in-out cursor-pointer">
                    {item.job.title}
                  </h2>
                  <p className="text-gray-600">{}</p>
                  <p className="text-gray-500 text-sm">{item.job.location}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-500">
                      Salary: ${item.job.salary}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => handleApplyClick(item.job._id)} // Call the function on click
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 shadow-lg"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          {/* We can show a message here */}
        </p>
      )}
    </div>
  );
};

export default JobRecommendation;
