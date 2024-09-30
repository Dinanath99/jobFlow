import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// ProtectedRoute for authenticated recruiters
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);

  // Check if the user is authenticated and has the recruiter role
  if (!user || user.role !== "Recruiter") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
