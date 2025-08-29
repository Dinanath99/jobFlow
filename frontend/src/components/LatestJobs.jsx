import { setSearchedQuery } from "@/redux/jobSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";

const LatestJobs = () => {
  const dispatch = useDispatch();
  // useGetAllJobs(); // Call the custom hook to fetch jobs
  const { allJobs } = useSelector((store) => store.job);
  console.log(allJobs);
  useEffect(()=>{
    console.log(allJobs)

  },[allJobs])
 
  return (
    <div className="max-w-7xl mx-auto ">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A39C2] px-2">Latest</span> jobs
      </h1>

      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length === 0 ? (
          <span>No jobs Available</span>
        ) : (
          allJobs
            .slice(0, 6)
            .map((item) => <LatestJobCards key={item._id} job={item} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
