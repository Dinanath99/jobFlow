import { Badge } from "./ui/badge";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  const dispatch = useDispatch();
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        setIsApplied(true); //if application is successfull then set isApplied to true
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        }; //update the single job with new application in real time
        dispatch(setSingleJob(updatedSingleJob)); //update the single job in redux store
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getbyid/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl">{singleJob?.title}</h1>
            <div className="flex items-center gap-2 mt-4">
              <Badge className="text-blue-700 font-bold bg-slate-200 hover:bg-slate-400">
                Position {singleJob?.position}
              </Badge>
              <Badge className="text-[rgb(248,48,2)] font-bold bg-slate-200 hover:bg-slate-400">
                {singleJob?.jobType}
              </Badge>
              <Badge className="text-[#7209b7] font-bold bg-slate-200 hover:bg-slate-400">
                Salary {singleJob?.salary}
              </Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg ${
              isApplied ? `bg-gray-600 cursor-not-allowed` : `bg-[#7209b7]`
            }`}
          >
            {isApplied ? `Already Applied` : `Apply Now`}
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
            Total Applicant:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.applications?.length}
            </span>{" "}
          </h1>
          <h1 className="font-bold my-1">
            Posted Date:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.createdAt.split("T")[0]}
              {/* splicting the date and time */}
            </span>{" "}
          </h1>
        </div>
      </div>
    </div>
  );
};
export default JobDescription;
