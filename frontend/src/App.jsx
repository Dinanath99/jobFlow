import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./components/shared/Navbar";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import Description from "./components/JobDescription";
import Companies from "./components/recruiter/Companies";
import CompanyCreate from "./components/recruiter/CompanyCreate";
import CompanySetup from "./components/recruiter/CompanySetup";
import Blog from "./components/Blog";
import PostJob from "./components/recruiter/PostJob";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/description/:id",
    element: <Description />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },

  //recruiter routes
  {
    path: "recruiter/companies",
    element: <Companies />,
  },
  {
    path: "recruiter/companies/create",
    element: <CompanyCreate />,
  },
  {
    path: "recruiter/companies/:id",
    element: <CompanySetup />,
  },
  {
    path: "recruiter/postjob",
    element: <PostJob />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
