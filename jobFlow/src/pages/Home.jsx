import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch("http://localhost:5000/api/jobs");
      const data = await response.json();
      setJobs(data);
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <Navbar />
      <header className="bg-blue-600 text-white text-center py-20">
        <h1 className="text-5xl font-bold">Welcome to the Job Portal</h1>
        <p className="mt-4 text-xl">Find your dream job here</p>
      </header>
      <main className="container mx-auto mt-8">
        <section>
          <h2 className="text-3xl font-bold mb-4">Latest Jobs</h2>
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Home;
