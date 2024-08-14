import React from "react";
import LatestJobCards from "./LatestJobCards";
const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const LatestJobs = () => {
  return (
    <div className="max-w-7xl mx-auto my-20 ">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A39C2] px-2">Latest</span>jobs
      </h1>

      <div className="grid grid-cols-3 gap-4 my-5">
        {/* slice method use to slice the item it show only 6 items */}
        {randomJobs.slice(0, 6).map((item, index) => (
          <LatestJobCards />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
