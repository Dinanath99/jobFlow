import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";

const Job = ({ job }) => {
  const navigate = useNavigate();
  // const jobid = "jobid"; // this would normally be dynamic

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p>Nepal</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold bg-slate-200 hover:bg-slate-400">
          {job?.position}
        </Badge>
        <Badge className="text-[#F83002] font-bold bg-slate-200 hover:bg-slate-400">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold bg-slate-200 hover:bg-slate-400">
          {job?.salary}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => {
            navigate(`/description/${job?._id}`);
          }}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
