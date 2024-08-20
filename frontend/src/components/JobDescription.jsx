import { Badge } from "./ui/badge";
import React from "react";
import { Button } from "./ui/button";

const JobDescription = () => {
  const isApplied = true;
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">Title</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold bg-slate-200 hover:bg-slate-400">
              12 positions
            </Badge>
            <Badge className="text-[#F83002] font-bold bg-slate-200 hover:bg-slate-400">
              Part Time
            </Badge>
            <Badge className="text-[#7209b7] font-bold bg-slate-200 hover:bg-slate-400">
              16k
            </Badge>
          </div>
        </div>
        <Button
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied ? `bg-gray-600 cursor-not-allowed` : `bg-[#7209b7]`
          }`}
        >
          {isApplied ? `Applied` : `Apply Now`}
        </Button>
      </div>
    </div>
  );
};

export default JobDescription;
