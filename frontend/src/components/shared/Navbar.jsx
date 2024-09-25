
import jobflow from "@/assets/jobflow.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white shadow-md px-4 py-2 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <img src={jobflow} alt="logo" className="h-12" />
        </div>
        <div className="flex items-center gap-6">
          <ul className="flex space-x-6 font-medium text-gray-700">
            {user && user.role === "Recruiter" ? (
              <>
                <li>
                  <Link
                    className="hover:text-blue-600"
                    to="/recruiter/companies"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-blue-600"
                    to="/recruiter/recruiterJobs"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className="hover:text-blue-600" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-blue-600" to="/jobs">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-blue-600" to="/browse">
                    Browse
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-blue-600" to="/blog">
                    Blog
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-600 hover:bg-blue-100"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border border-gray-300 hover:border-gray-400">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-4 bg-white shadow-lg rounded-lg">
                <div className="flex items-start space-x-3">
                  <Avatar className="cursor-pointer border border-gray-300 hover:border-gray-400">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="text-lg font-semibold">{user?.fullname}</h4>
                    <p className="text-gray-500 text-sm">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-gray-700">
                  <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-600">
                    <User2 className="text-gray-500" />
                    <Link to="/profile">
                      <Button variant="link" className="text-gray-700">
                        Profile
                      </Button>
                    </Link>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer hover:text-red-600">
                    <LogOut className="text-gray-500" />
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="text-gray-700"
                    >
                      Log out
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
