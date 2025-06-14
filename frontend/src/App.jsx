import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ForgotPassword from "./components/auth/ForgotPassword";
import Login from "./components/auth/Login";
import SetNewPassword from "./components/auth/SetNewPassword";
import Signup from "./components/auth/Signup";
import Blog from "./components/Blog";
import Browse from "./components/Browse";
import Home from "./components/Home";
import Description from "./components/JobDescription";
import Jobs from "./components/Jobs";
import Profile from "./components/Profile";
import Applicants from "./components/recruiter/Applicants";
import Companies from "./components/recruiter/Companies";
import CompanyCreate from "./components/recruiter/CompanyCreate";
import CompanySetup from "./components/recruiter/CompanySetup";
import JobEdit from "./components/recruiter/JobEdit";
import PostJob from "./components/recruiter/PostJob";
import ProtectedRoute from "./components/recruiter/ProtectedRoute";
import RecruiterJobs from "./components/recruiter/RecruiterJobs";

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
    path: "/forgot",
    element: <ForgotPassword />,
  },
  {
    path: "/set-new-password",
    element: <SetNewPassword />,
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

  // Recruiter routes (protected by recruiter role)
  {
    path: "recruiter/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "recruiter/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "recruiter/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "recruiter/recruiterJobs",
    element: (
      <ProtectedRoute>
        <RecruiterJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "recruiter/jobs/create",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "recruiter/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
  {
    path: "recruiter/jobs/:id",
    element: (
      <ProtectedRoute>
        <JobEdit />
      </ProtectedRoute>
    ),
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
