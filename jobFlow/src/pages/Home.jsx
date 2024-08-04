import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

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

      <main className="container mx-auto mt-8">
        <section>
          <h1>Hello how you doing man !</h1>
        </section>
      </main>
    </div>
  );
};

export default Home;
