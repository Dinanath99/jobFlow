import React from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";

const Jobs = () => {
  return (
    <div>
      <Navbar />
      {/* filter card */}
      <FilterCard />
      {/* job card */}
      <Job />
    </div>
  );
};

export default Jobs;
