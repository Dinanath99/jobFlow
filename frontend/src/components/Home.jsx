import useGetAllJobs from "@/hooks/useGetAllJobs";
import Category from "./Category";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import LatestJobs from "./LatestJobs";
import Navbar from "./shared/Navbar";

const Home = () => {
  useGetAllJobs();
  return (
    <div>
      <Navbar />
      <HeroSection />
      <LatestJobs />
      <Category />
      <Footer />
    </div>
  );
};

export default Home;
