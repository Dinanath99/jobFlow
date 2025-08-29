import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { setLoading, setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";
import Navbar from "../shared/Navbar";
import { Eye, EyeOff } from "lucide-react";

// Validation schema
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
  const { user } = useSelector((store) => store.auth);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setLoading(true));
        const res = await axios.post(`${USER_API_END_POINT}/login`, values, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUser(res.data.user));
          navigate("/");
          toast.success(res.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Login failed");
      } finally {
        dispatch(setLoading(false));
      }
    },
  });

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="my-20">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full sm:w-1/2 border border-gray-200 rounded-md p-6 my-10 shadow-md"
        >
          <h1 className="font-bold text-2xl mb-6 text-center">Login</h1>

          {/* Email */}
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password with eye toggle */}
          <div className="mb-4 relative">
            <Label htmlFor="password">Password</Label>
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
              className="absolute right-3 top-9 text-gray-600"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Role radio buttons */}
          <div className="mb-4">
            <RadioGroup className="flex gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="role-applicant"
                  name="role"
                  value="Applicant"
                  checked={formik.values.role === "Applicant"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                />
                <Label htmlFor="role-recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
            {formik.touched.role && formik.errors.role && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.role}</p>
            )}
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700 my-4"
          >
            Login
          </Button>

          {/* Link to signup */}
          <div className="text-sm text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-700 underline">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
