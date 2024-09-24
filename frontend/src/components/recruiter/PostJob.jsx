import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchCompanyByText } from "@/redux/companySlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import RecruiterJobsTable from "./RecruiterJobsTable";

const PostJob = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-28">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/recruiter/companies/create")}>
            Post New Jobs
          </Button>
        </div>
        <RecruiterJobsTable />
      </div>
    </div>
  );
};

export default PostJob;
