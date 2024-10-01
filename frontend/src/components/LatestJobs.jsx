import useGetAllJobs from "@/hooks/useGetAllJobs"; // Adjust the path if necessary
import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";

const LatestJobs = () => {
  useGetAllJobs(); // Call the custom hook to fetch jobs
  const { allJobs } = useSelector((state) => state.job);
  console.log(allJobs);


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
            .map((item) => (
              <LatestJobCards
                
                key={item._id}
                job={item}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
