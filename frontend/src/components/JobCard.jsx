// src/components/JobCard.jsx

const JobCard = ({ job }) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200 ">
      <h3 className="font-semibold text-lg">{job.title}</h3>
      <p>{job.company}</p>
      <p className="text-gray-500">{job.location}</p>
      <div className="mt-2">
        {job.skills.map((skill) => (
          <span key={skill} className="badge">
            {skill}
          </span>
        ))}
      </div>
      <a href={`/jobs/${job.id}`} className="text-blue-500 hover:underline">
        View Job
      </a>
    </div>
  );
};

export default JobCard;
