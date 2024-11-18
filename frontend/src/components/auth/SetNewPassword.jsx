import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";
import Navbar from "../shared/Navbar";

const SetNewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ""; // Get email from location state

  const formik = useFormik({
    initialValues: {
      otp: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .length(6, "OTP must be 6 digits.")
        .required("OTP is required."),
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters.")
        .required("New password is required."),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/verify`,
          {
            email,
            otp: values.otp,
            newPassword: values.newPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error("Failed to reset password. Please try again.");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Password reset failed.");
      }
    },
  });

  return (
    <div className="my-20">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={formik.handleSubmit}
          className="w-1/2 border border-gray-200 rounded-md p-6 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Set New Password</h1>

          <div className="my-4">
            <Label htmlFor="otp">OTP</Label>
            <Input
              type="text"
              id="otp"
              name="otp"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter the OTP sent to your email"
            />
            {formik.touched.otp && formik.errors.otp && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.otp}</p>
            )}
          </div>

          <div className="my-4">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your new password"
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-red-600 text-sm mt-1">
                {formik.errors.newPassword}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full my-4 bg-blue-600 text-white hover:bg-blue-700"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SetNewPassword;
