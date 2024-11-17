

import { setSingleJob } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import {
  faBriefcase,
  faCalendarAlt,
  faClipboardList,
  faDollarSign,
  faMapMarkerAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setIsApplied(true); // if application is successful then set isApplied to true
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        }; // update the single job with new application in real time
        dispatch(setSingleJob(updatedSingleJob)); // update the single job in redux store
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        // Conditionally set withCredentials only if the user is logged in
        const config = user ? { withCredentials: true } : {};

        const res = await axios.get(
          `${JOB_API_END_POINT}/getbyid/${jobId}`,
          {
            withCredentials: true,
          }
        );
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
      <div className="max-w-4xl mx-auto my-24 px-4 sm:px-6 lg:px-4">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {singleJob?.title}
              </h1>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge className="bg-blue-100 text-blue-800 font-semibold">
                  <FontAwesomeIcon icon={faBriefcase} className="mr-1" />
                  Position: {singleJob?.position}
                </Badge>
                <Badge className="bg-red-100 text-red-600 font-semibold">
                  <FontAwesomeIcon icon={faClipboardList} className="mr-1" />
                  {singleJob?.jobType}
                </Badge>
                <Badge className="bg-purple-100 text-purple-700 font-semibold">
                  <FontAwesomeIcon icon={faDollarSign} className="mr-1" />
                  Salary: {singleJob?.salary}
                </Badge>
              </div>
            </div>
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`rounded-full px-6 py-3 text-white font-semibold ${
                isApplied
                  ? `bg-gray-500 cursor-not-allowed`
                  : `bg-purple-600 hover:bg-purple-700`
              } transition duration-300`}
            >
              {isApplied ? `Already Applied` : `Apply Now`}
            </Button>
          </div>

          <div className="space-y-4 border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900">Job Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Required Skills",
                  icon: faClipboardList,
                  content: singleJob?.requirements,
                },
                {
                  title: "Role",
                  icon: faBriefcase,
                  content: singleJob?.title,
                },
                {
                  title: "Location",
                  icon: faMapMarkerAlt,
                  content: singleJob?.location,
                },
                {
                  title: "Experience Level",
                  icon: faUsers,
                  content: singleJob?.experienceLevel,
                },
                {
                  title: "Total Applicants",
                  icon: faUsers,
                  content: singleJob?.applications?.length,
                },
                {
                  title: "Posted Date",
                  icon: faCalendarAlt,
                  content: singleJob?.createdAt.split("T")[0],
                },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-base font-semibold text-gray-700">
                    {item.title}:
                    <FontAwesomeIcon icon={item.icon} className="ml-1" />
                  </h3>
                  <p className="text-gray-600">{item.content}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 mt-4">
              <h3 className="text-base font-semibold text-gray-700">
                Description:
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {singleJob?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
