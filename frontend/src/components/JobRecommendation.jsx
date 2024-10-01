// import useGetJobRecommendations from "@/hooks/useGetJobRecommendations";
// import { useSelector } from "react-redux";

// const JobRecommendation = () => {
//   useGetJobRecommendations();

//   // Get job recommendations from Redux store
//   const jobRecommendations = useSelector(
//     (state) => state.job.jobRecommendations
//   );

//   console.log("Job Recommendations from Redux:", jobRecommendations); // Log the recommendations

//   return (
//     <div className="max-w-2xl mx-auto bg-white rounded-2xl my-20 p-5 shadow-md">
//       <h1 className="font-bold text-lg my-5">Job Recommendations</h1>

//       {/* Check if jobRecommendations is defined and has items */}
//       {Array.isArray(jobRecommendations) && jobRecommendations.length > 0 ? (
//         jobRecommendations.map((item) => (
//           <div key={item.job._id} className="border-b py-4">
//             <h2 className="text-xl font-semibold">{item.job.title}</h2>
//             <p className="text-gray-600">{item.job.description}</p>
//             <div className="flex justify-between mt-2">
//               <span className="text-sm text-gray-500">{item.job.location}</span>
//               <span className="text-sm text-gray-500">
//                 Salary: ${item.job.salary}
//               </span>
//             </div>
//             <a
//               href={`/apply/${item.job._id}`}

//               className="text-blue-500 hover:underline"
//             >
//               Apply Now
//             </a>
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

const JobRecommendation = () => {
  useGetJobRecommendations();

  // Get job recommendations from Redux store
  const jobRecommendations = useSelector(
    (state) => state.job.jobRecommendations
  );

  console.log("Job Recommendations from Redux:", jobRecommendations); // Log the recommendations

  // Initialize the useNavigate hook
  const navigate = useNavigate();

  const handleApplyClick = (jobId) => {
    navigate(`/description/${jobId}`); // Navigate to the job description page
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl my-20 p-5 shadow-md">
      <h1 className="font-bold text-lg my-5">Job Recommendations</h1>

      {/* Check if jobRecommendations is defined and has items */}
      {Array.isArray(jobRecommendations) && jobRecommendations.length > 0 ? (
        jobRecommendations.map((item) => (
          <div key={item.job._id} className="border-b py-4">
            <h2 className="text-xl font-semibold">{item.job.title}</h2>
            <p className="text-gray-600">{item.job.description}</p>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500">{item.job.location}</span>
              <span className="text-sm text-gray-500">
                Salary: ${item.job.salary}
              </span>
            </div>
            <button
              onClick={() => handleApplyClick(item.job._id)} // Call the function on click
              className="text-blue-500 hover:underline"
            >
              Apply Now
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No job recommendations available.</p>
      )}
    </div>
  );
};

export default JobRecommendation;
