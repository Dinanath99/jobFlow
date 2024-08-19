import React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="text-center bg-white text-gray-800 py-15">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 text-white font-medium shadow-lg">
          Welcome to JobFlow - Your Path to Success
        </span>
        <h1 className="text-5xl font-extrabold leading-tight">
          Discover, Apply & <br /> Secure Your{" "}
          <span className="text-[#6A38C2]">Dream Career</span> Today
        </h1>
        <div className="flex w-[40%] shadow-lg border border-gray-300 pl-3 rounded-full items-center gap-4 mx-auto bg-white">
          <input
            type="text"
            placeholder="Find your dream job"
            className="outline-none border-none w-full text-gray-800"
          />
          <Button className="rounded-r-full bg-[#6A38C2] text-white">
            <Search className="h-5 w-5" />
          </Button>
        </div>
        {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
          Unlock endless opportunities with JobFlow. Whether you're searching
          for your first job or looking to advance your career, we've got you 
          covered. Explore thousands of job listings tailored to your skills and
          aspirations.
        </p> */}
      </div>
    </div>
  );
};

export default HeroSection;
