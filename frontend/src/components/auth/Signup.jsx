// import React, { useState } from "react";

// import Navbar from "../shared/Navbar";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Link, useNavigate } from "react-router-dom";

// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { USER_API_END_POINT } from "@/utils/constant";
// import { toast } from "sonner";
// const Signup = () => {
//   const [input, setInput] = useState({
//     fullname: "",
//     email: "",
//     password: "",
//     phoneNumber: "",
//     role: "",
//     file: "",
//   });

//   //usenavigate hook to redirect to login page after succesfull signup
//   const navigate = useNavigate();
//   const changeEventHandler = (e) => {
//     setInput({
//       ...input, //spreading the input object
//       [e.target.name]: e.target.value, // setting the value of the input field
//     });
//   };

//   const changeFileHandler = (e) => {
//     setInput({
//       ...input,
//       file: e.target.files?.[0],
//     });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("fullname", input.fullname);
//     formData.append("email", input.email);
//     formData.append("password", input.password);
//     formData.append("phoneNumber", input.phoneNumber);
//     formData.append("role", input.role);

//     if (input.file) {
//       formData.append("file", input.file);
//     }
//     try {
//       const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
//         Headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         navigate("/login");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     }
//   };

//   return (
//     <div className="my-20">
//       <Navbar />
//       <div className="flex items-center justify-center max-w 7xl mx-auto">
//         <form
//           onSubmit={submitHandler}
//           className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
//         >
//           <h1 className="font-bold text-xl mb-5">Signup</h1>
//           <div className="my-2">
//             <Label htmlFor="name">Full Name</Label>
//             <Input
//               type="text"
//               value={input.fullname}
//               name="fullname"
//               onChange={changeEventHandler}
//               placeholder="Enter your name"
//             />
//           </div>
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
//           <div className="my-2">
//             <Label htmlFor="name">Phone Number</Label>
//             <Input
//               type="text"
//               value={input.phoneNumber}
//               name="phoneNumber"
//               onChange={changeEventHandler}
//               placeholder="Enter your phone number"
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
//                   value="recruiter"
//                   checked={input.role === "recruiter"}
//                   onChange={changeEventHandler}
//                   className="cursor-pointer"
//                 />
//                 <Label htmlFor="r2">Recruiter</Label>
//               </div>
//             </RadioGroup>
//             <div className="flex items-center gap-2">
//               <Label>file</Label>
//               <Input
//                 accept="image/*"
//                 type="file"
//                 onChange={changeFileHandler}
//                 className="cursor-pointer"
//               />
//             </div>
//           </div>
//           <Button
//             type="submit"
//             className="w-full my-4 bg-blue-600 text-white hover:bg-blue-700"
//           >
//             Signup
//           </Button>
//           <span className="text-sm">
//             Already have an account?
//             <Link to="/login" className="text-blue-700">
//               Login
//             </Link>
//           </span>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";
import Navbar from "../shared/Navbar";

const Signup = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); //return the user from the state
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      phoneNumber: "",
      role: "",
      file: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Full name is required."),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required."),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters.")
        .required("Password is required."),
      phoneNumber: Yup.string()
        .matches(
          /^9\d{9}$/,
          "Phone number must start with 9 and be 10 digits long."
        )
        .required("Phone number is required."),
      role: Yup.string().required("Role is required."),
      file: Yup.mixed().test(
        "fileSize",
        "File is too large",
        (value) => !value || value.size <= 2000000
      ), // 2MB
    }),

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("fullname", values.fullname);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("role", values.role);

      if (values.file) {
        formData.append("file", values.file);
      }

      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/register`,
          formData,
          {
            Headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          navigate("/login");
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    },
  });

  useEffect(() => {
    //if user is already logged in then redirect to home page
    if (user) {
      navigate("/");
    }
  });
  return (
    <div className="my-20">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={formik.handleSubmit}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Signup</h1>

          <div className="my-2">
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              type="text"
              id="fullname"
              name="fullname"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your name"
            />
            {formik.touched.fullname && formik.errors.fullname && (
              <p className="text-red-600 text-sm">{formik.errors.fullname}</p>
            )}
          </div>

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

          <div className="my-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your phone number"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p className="text-red-600 text-sm">
                {formik.errors.phoneNumber}
              </p>
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

            <div className="flex items-center gap-2">
              <Label>File</Label>
              <Input
                accept="image/*"
                type="file"
                id="file"
                name="file"
                onChange={(event) => {
                  formik.setFieldValue("file", event.currentTarget.files[0]);
                }}
                className="cursor-pointer"
              />
              {formik.touched.file && formik.errors.file && (
                <p className="text-red-600 text-sm">{formik.errors.file}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full my-4 bg-blue-600 text-white hover:bg-blue-700"
          >
            Signup
          </Button>
          <span className="text-sm">
            Already have an account?
            <Link to="/login" className="text-blue-700">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
