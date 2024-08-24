// import { Link, useNavigate } from "react-router-dom";
// import React from "react";
// import jobflow from "@/assets/jobflow.png";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// import { Avatar, AvatarImage } from "@/components/ui/avatar";

// import { Button } from "@/components/ui/button";
// import { Fullscreen, LogOut, User2 } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";
// import axios from "axios";
// import { USER_API_END_POINT } from "@/utils/constant";
// import { setUser } from "@/redux/authSlice";

// const Navbar = () => {
//   //conditional rendering based on user authentication
//   //const user = true;
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const logoutHandler = async () => {
//     try {
//       const res = await axios.get(`${USER_API_END_POINT}/logout`, {
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         dispatch(setUser(null));
//         navigate("/");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     }
//   };
//   console.log("Profile Photo URL:", user?.profile?.profilePhoto);

//   return (
//     <div className="bg-white px-4">
//       <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
//         <div>
//           {/* <h1 className="text-2xl font-bold">
//             Job <span className="text-[#f83002]">Flow</span>
//           </h1> */}
//           <img src={jobflow} alt="logo" className="h-14" />
//         </div>
//         <div className="flex items-center gap-12">
//           <ul className="flex font-medium items-center gap-5">
//             {user && user.role === "Recruiter" ? (
//               <>
//                 <li>
//                   <Link to="/recruiter/companies">Companies</Link>
//                 </li>
//                 <li>
//                   <Link to="/admin/jobs">Jobs</Link>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <Link to="/">Home</Link>
//                 </li>
//                 <li>
//                   <Link to="/jobs">Jobs</Link>
//                 </li>
//                 <li>
//                   <Link to="/browse">Browse</Link>
//                 </li>
//               </>
//             )}
//           </ul>
//           {!user ? (
//             //login and signup button if user is not aunthenticated
//             <div className="flex items-center gap-2">
//               <Link to="/login">
//                 <Button variant="outline">Login</Button>
//               </Link>
//               <Link to="/signup">
//                 <Button className="bg-[#6A38c2] hover:bg-[#290568]">
//                   Signup
//                 </Button>
//               </Link>
//             </div>
//           ) : (
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Avatar className="cursor-pointer">
//                   <AvatarImage
//                     src={user?.profile?.profilePhoto}
//                     alt="@shadcn"
//                   />
//                 </Avatar>
//               </PopoverTrigger>
//               <PopoverContent className="w-80">
//                 <div className="">
//                   <div className="flex gap-2 space-y-2">
//                     <Avatar className="cursor-pointer">
//                       <AvatarImage
//                         src={user?.profile?.profilePhoto}
//                         alt="@shadcn"
//                       />
//                     </Avatar>
//                     <div>
//                       <h4 className="font-medium">{user?.fullname}</h4>
//                       <p className="text-gray-500">{user?.profile?.bio} </p>
//                     </div>
//                   </div>

//                   <div className="flex flex-col my-2 text-gray-600">
//                     <div className="flex w-fit items-center gap-2 cursor-pointer">
//                       <User2 />
//                       <Button variant="link">
//                         <Link to="/profile">Profile</Link>
//                       </Button>
//                     </div>
//                     <div className="flex w-fit items-center gap-2 cursor-pointer">
//                       <LogOut />
//                       <Button onClick={logoutHandler} variant="link">
//                         Log out
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </PopoverContent>
//             </Popover>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// import { Link, useNavigate } from "react-router-dom";
// import React from "react";
// import jobflow from "@/assets/jobflow.png";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Fullscreen, LogOut, User2 } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";
// import axios from "axios";
// import { USER_API_END_POINT } from "@/utils/constant";
// import { setUser } from "@/redux/authSlice";

// const Navbar = () => {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const logoutHandler = async () => {
//     try {
//       const res = await axios.get(`${USER_API_END_POINT}/logout`, {
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         dispatch(setUser(null));
//         navigate("/");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     }
//   };

//   return (
//     <div className="bg-white shadow-md px-4 py-2">
//       <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
//         <div>
//           <img src={jobflow} alt="logo" className="h-12" />
//         </div>
//         <div className="flex items-center gap-6">
//           <ul className="flex space-x-6 font-medium text-gray-700">
//             {user && user.role === "Recruiter" ? (
//               <>
//                 <li>
//                   <Link
//                     className="hover:text-blue-600"
//                     to="/recruiter/companies"
//                   >
//                     Companies
//                   </Link>
//                 </li>
//                 <li>
//                   <Link className="hover:text-blue-600" to="/admin/jobs">
//                     Jobs
//                   </Link>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <Link className="hover:text-blue-600" to="/">
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <Link className="hover:text-blue-600" to="/jobs">
//                     Jobs
//                   </Link>
//                 </li>
//                 <li>
//                   <Link className="hover:text-blue-600" to="/browse">
//                     Browse
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//           {!user ? (
//             <div className="flex items-center space-x-2">
//               <Link to="/login">
//                 <Button
//                   variant="outline"
//                   className="text-blue-600 border-blue-600 hover:bg-blue-100"
//                 >
//                   Login
//                 </Button>
//               </Link>
//               <Link to="/signup">
//                 <Button className="bg-blue-600 text-white hover:bg-blue-700">
//                   Signup
//                 </Button>
//               </Link>
//             </div>
//           ) : (
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Avatar className="cursor-pointer border border-gray-300 hover:border-gray-400">
//                   <AvatarImage
//                     src={user?.profile?.profilePhoto}
//                     alt="@shadcn"
//                   />
//                 </Avatar>
//               </PopoverTrigger>
//               <PopoverContent className="w-72 p-4 bg-white shadow-lg rounded-lg">
//                 <div className="flex items-start space-x-3">
//                   <Avatar className="cursor-pointer border border-gray-300 hover:border-gray-400">
//                     <AvatarImage
//                       src={user?.profile?.profilePhoto}
//                       alt="@shadcn"
//                     />
//                   </Avatar>
//                   <div>
//                     <h4 className="text-lg font-semibold">{user?.fullname}</h4>
//                     <p className="text-gray-500 text-sm">
//                       {user?.profile?.bio}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="mt-4 space-y-2 text-gray-700">
//                   <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-600">
//                     <User2 className="text-gray-500" />
//                     <Link to="/profile">
//                       <Button variant="link" className="text-gray-700">
//                         Profile
//                       </Button>
//                     </Link>
//                   </div>
//                   <div className="flex items-center space-x-2 cursor-pointer hover:text-red-600">
//                     <LogOut className="text-gray-500" />
//                     <Button
//                       onClick={logoutHandler}
//                       variant="link"
//                       className="text-gray-700"
//                     >
//                       Log out
//                     </Button>
//                   </div>
//                 </div>
//               </PopoverContent>
//             </Popover>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import React from "react";
import jobflow from "@/assets/jobflow.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Fullscreen, LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

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
                  <Link className="hover:text-blue-600" to="/admin/jobs">
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
