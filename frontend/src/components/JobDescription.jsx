import { Badge } from "./ui/badge";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";

const JobDescription = () => {
  const isApplied = true;
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getbyid/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold bg-slate-200 hover:bg-slate-400">
              {singleJob?.position}
            </Badge>
            <Badge className="text-[rgb(248,48,2)] font-bold bg-slate-200 hover:bg-slate-400">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold bg-slate-200 hover:bg-slate-400">
              {singleJob?.salary}
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
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        Job description
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.title}
          </span>{" "}
        </h1>
        <h1 className="font-bold my-1">
          Location:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.location}
          </span>{" "}
        </h1>
        <h1 className="font-bold my-1">
          Description:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.description}
          </span>{" "}
        </h1>
        <h1 className="font-bold my-1">
          Experience:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.experienceLevel}
          </span>{" "}
        </h1>
        <h1 className="font-bold my-1">
          Salary:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.salary}
          </span>{" "}
        </h1>
        <h1 className="font-bold my-1">
          Total:
          <span className="pl-4 font-normal text-gray-800">4</span>{" "}
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:
          <span className="pl-4 font-normal text-gray-800">
            20-08-2024
          </span>{" "}
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
