import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import Navbar from "./shared/Navbar";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-28">
        <h1 className="font-bold text-xl my-10">
          Search Results ({allJobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {allJobs.map((job) => {
            return <Job key={job.id} job={job} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
