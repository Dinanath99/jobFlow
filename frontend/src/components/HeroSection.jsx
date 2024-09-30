import { setSearchedQuery } from "@/redux/jobSlice";
import { Search } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div className="relative text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white py-20">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://via.placeholder.com/1500x600" // Replace with your desired background image
          alt="Hero Background"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      <div className="relative z-10 flex flex-col gap-6 my-12">
        <span className="mx-auto px-8 py-4 rounded-full bg-opacity-75 bg-white text-gray-800 font-semibold shadow-xl">
          Welcome to JobFlow - Your Path to Success
        </span>
        <h1 className="text-6xl font-extrabold leading-tight">
          Discover, Apply & <br /> Secure Your{" "}
          <span className="text-yellow-300">Dream Career</span> Today
        </h1>
        <p className="text-lg max-w-3xl mx-auto mt-4">
          Unlock endless opportunities with JobFlow. Whether you're searching
          for your first job or looking to advance your career, we've got you
          covered. Explore thousands of job listings tailored to your skills and
          aspirations. Start your journey now!
        </p>
        <div className="flex w-[60%] mx-auto shadow-lg border border-gray-300 rounded-full bg-white overflow-hidden">
          <input
            type="text"
            placeholder="Find your dream job..."
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full px-4 py-2 text-gray-800"
          />
          <Button
            onClick={searchJobHandler}
            className="bg-[#6A38C2] text-white px-6 py-2 rounded-r-full"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
