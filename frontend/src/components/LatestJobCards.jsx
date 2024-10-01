

import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-6 rounded-lg shadow-lg bg-white border border-gray-200 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-gray-300"
    >
      <div className="flex items-center space-x-4 mb-4">
        {/* Company Logo */}
        {job?.company?.logo && (
          <img
            src={job.company.logo} // Make sure this points to the correct logo URL
            alt={`${job.company.name} logo`}
            className="w-12 h-12 rounded-full" // You can adjust the size as needed
          />
        )}
        <h1 className="font-semibold text-xl text-gray-900">
          {job?.company?.name}
        </h1>
      </div>

      <div className="space-y-3 mt-3">
        <h2 className="font-bold text-lg text-indigo-600">{job?.title}</h2>
        <p className="text-sm text-gray-700 line-clamp-3">{job?.description}</p>
      </div>

      <div className="flex items-center flex-wrap gap-2 mt-4">
        <Badge className="text-blue-700 bg-blue-100 hover:bg-blue-200">
          {job?.position} Positions
        </Badge>
        <Badge className="text-red-700 bg-red-100 hover:bg-red-200">
          {job?.jobType}
        </Badge>
        <Badge className="text-green-700 bg-green-100 hover:bg-green-200">
          {job?.salary} Salary
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
