import React from "react";
import { Badge } from "./ui/badge";
const LatestJobCards = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">Company Name</h1>
        <p className="text-sm text-gray-500">Kathmandu</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Job Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor, sit amet consdert alit{" "}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge
          className={"text-blue-700 font-bold bg-slate-200 hover:bg-slate-400"}
        >
          12 Positions
        </Badge>
        <Badge
          className={"text-[#F83002] font-bold bg-slate-200 hover:bg-slate-400"}
        >
          Part Time
        </Badge>
        <Badge
          className={"text-[#7209b7] font-bold bg-slate-200 hover:bg-slate-400"}
        >
          50k
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
