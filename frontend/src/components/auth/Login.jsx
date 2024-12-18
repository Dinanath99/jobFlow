// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../shared/Navbar";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Link } from "react-router-dom";
// import { USER_API_END_POINT } from "@/utils/constant";
// import axios from "axios";

// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { useDispatch, useSelector } from "react-redux";
// import { setUser, setLoading } from "@/redux/authSlice";

// const Login = () => {
//   const [input, setInput] = useState({
//     email: "",
//     password: "",
//     role: "",
//   });

//   //usenavigate hook to redirect to login page after succesfull signup
//   const { loading, user } = useSelector((store) => store.auth);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const changeEventHandler = (e) => {
//     setInput({
//       ...input, //spreading the input object
//       [e.target.name]: e.target.value, // setting the value of the input field
//     });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(setLoading(true));
//       const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
//         Headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         dispatch(setUser(res.data.user));
//         navigate("/");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };
//   useEffect(() => {
//     if (user) {
//       navigate("/");
//     }
//   }, []);
//   return (
//     <div className="my-20">
//       <Navbar />
//       <div className="flex items-center justify-center max-w 7xl mx-auto">
//         <form
//           onSubmit={submitHandler}
//           className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
//         >
//           <h1 className="font-bold text-xl mb-5">Login</h1>

//           <div className="my-2">
//             <Label htmlFor="name">Email</Label>
//             <Input
//               type="text"
//               value={input.email}
//               name="email"
//               onChange={changeEventHandler}
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="my-2">
//             <Label htmlFor="name">Password</Label>
//             <Input
//               type="password"
//               value={input.password}
//               name="password"
//               onChange={changeEventHandler}
//               placeholder="Enter your password"
//             />
//           </div>

//           <div className="flex items-center justify-between">
//             <RadioGroup className="flex items-center gap-4 my-5">
//               <div className="flex items-center space-x-2">
//                 <Input
//                   type="radio"
//                   name="role"
//                   value="Applicant"
//                   checked={input.role === "Applicant"}
//                   onChange={changeEventHandler}
//                   className="cursor-pointer"
//                 />
//                 <Label htmlFor="r1">Applicant</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Input
//                   type="radio"
//                   name="role"
//                   value="Recruiter"
//                   checked={input.role === "Recruiter"}
//                   onChange={changeEventHandler}
//                   className="cursor-pointer"
//                 />
//                 <Label htmlFor="r2">Recruiter</Label>
//               </div>
//             </RadioGroup>
//           </div>
//           <Button
//             type="submit"
//             className="w-full my-4 bg-blue-600 text-white hover:bg-blue-700"
//           >
//             Login
//           </Button>
//           <span className="text-sm">
//             Don't have an account?
//             <Link to="/signup" className="text-blue-700">
//               Signup
//             </Link>
//           </span>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { setLoading, setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";
import Navbar from "../shared/Navbar";

// Define the validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required."),
  role: Yup.string().required("Role is required."),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setLoading(true));
        const res = await axios.post(`${USER_API_END_POINT}/login`, values, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUser(res.data.user));
          navigate("/");
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      } finally {
        dispatch(setLoading(false));
      }
    },
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="my-20">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={formik.handleSubmit}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="my-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-600 text-sm">{formik.errors.email}</p>
            )}
          </div>

          <div className="my-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-600 text-sm">{formik.errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="role-applicant"
                  name="role"
                  value="Applicant"
                  checked={formik.values.role === "Applicant"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="cursor-pointer"
                />
                <Label htmlFor="role-applicant">Applicant</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="role-recruiter"
                  name="role"
                  value="Recruiter"
                  checked={formik.values.role === "Recruiter"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="cursor-pointer"
                />
                <Label htmlFor="role-recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
            {formik.touched.role && formik.errors.role && (
              <p className="text-red-600 text-sm">{formik.errors.role}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full my-4 bg-blue-600 text-white hover:bg-blue-700"
          >
            Login
          </Button>

          <span className="text-sm">
            Forgot Password?
            <Link to="/forgot" className="text-blue-700">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
