import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer"
    >
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">{job?.location}</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge
          className={"text-blue-700 font-bold bg-slate-200 hover:bg-slate-400"}
        >
          {job?.position}12 Positions
        </Badge>
        <Badge
          className={"text-[#F83002] font-bold bg-slate-200 hover:bg-slate-400"}
        >
          {job?.jobType}
        </Badge>
        <Badge
          className={"text-[#7209b7] font-bold bg-slate-200 hover:bg-slate-400"}
        >
          {job?.salary}Salary
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
