import { setSearchedQuery } from "@/redux/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Category = () => {
  const categories = [
    {
      name: "Frontend Developer",
      description:
        "Build amazing user interfaces with the latest technologies.",
    },
    {
      name: "Backend Developer",
      description: "Create robust server-side applications and APIs.",
    },
    {
      name: "Full Stack Developer",
      description:
        "Work on both frontend and backend to deliver complete solutions.",
    },
    {
      name: "UI/UX Designer",
      description:
        "Design beautiful and intuitive user interfaces and experiences.",
    },
    {
      name: "Data Engineer",
      description: "Design and build systems for managing and processing data.",
    },
    {
      name: "Education and Teaching Jobs",
      description: "Explore opportunities in education and training.",
    },
    {
      name: "Cloud Engineer",
      description:
        "Develop and maintain scalable cloud infrastructure solutions.",
    },
    {
      name: "Cybersecurity Specialist",
      description:
        "Ensure the security and integrity of IT systems and networks.",
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white py-20">
      <div className="relative z-10">
        {/* Categories Grid Section */}
        <section className="bg-white text-gray-800 py-16 px-4 rounded-2xl shadow-xl mx-4 sm:mx-8 lg:mx-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore Categories</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Discover a wide range of job categories tailored to your interests
              and skills. Browse through our categories to find the perfect fit
              for your career goals.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 rounded-2xl shadow-lg bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100"
              >
                <Button
                  onClick={() => searchJobHandler(category.name)}
                  variant="outline"
                  className="rounded-full bg-[#0d26a5] text-white mb-4"
                >
                  {category.name}
                </Button>
                <p className="text-gray-800 text-center">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Category;
