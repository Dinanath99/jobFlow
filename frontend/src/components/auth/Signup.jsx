
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "../shared/Navbar";
import { USER_API_END_POINT } from "@/utils/constant";

const Signup = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [showPassword, setShowPassword] = useState(false);

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
      fullname: Yup.string()
        .matches(/^[^\d]/, "Full name should not start with a number.")
        .required("Full name is required."),
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
      ),
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
            headers: {
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
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2/4 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
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
            Already have an account?{" "}
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
