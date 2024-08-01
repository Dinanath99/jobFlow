import React from "react";

const JobCard = ({ job }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-xl font-bold">{job.title}</h3>
      <p className="text-gray-700">{job.description}</p>
      <p className="text-gray-600">{job.company}</p>
      <p className="text-gray-600">{job.location}</p>
    </div>
  );
};

export default JobCard;
