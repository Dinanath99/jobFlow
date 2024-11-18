// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { USER_API_END_POINT } from "@/utils/constant";
// import axios from "axios";
// import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import * as Yup from "yup";
// import Navbar from "../shared/Navbar";

// const ForgotPassword = () => {
//   // const formik = useFormik({
//   //   initialValues: {
//   //     email: "",
//   //   },
//   //   validationSchema: Yup.object({
//   //     email: Yup.string()
//   //       .email("Invalid email address")
//   //       .required("Email is required."),
//   //   }),
//   //   onSubmit: async (values) => {
//   //     try {
//   //       const res = await axios.post(
//   //         `${USER_API_END_POINT}/forgot`,
//   //         values,
//   //         {
//   //           headers: {
//   //             "Content-Type": "application/json",
//   //           },
//   //           withCredentials: true,
//   //         }
//   //       );
//   //       if (res.data.success) {
//   //         toast.success(res.data.message);
//   //       } else {
//   //         toast.error("An error occurred. Please try again.");
//   //       }
//   //     } catch (error) {
//   //       console.log(error);
//   //       toast.error(
//   //         error.response?.data?.message ||
//   //           "Failed to send password reset email."
//   //       );
//   //     }
//   //   },
//   // });
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//     },
//     validationSchema: Yup.object({
//       email: Yup.string()
//         .email("Invalid email address")
//         .required("Email is required."),
//     }),
//     onSubmit: async (values) => {
//       try {
//         const res = await axios.post(`${USER_API_END_POINT}/forgot`, values, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         });
//         if (res.data.success) {
//           toast.success(res.data.message);
//           navigate("/set-new-password", { state: { email: values.email } });
//         } else {
//           toast.error("An error occurred. Please try again.");
//         }
//       } catch (error) {
//         console.log(error);
//         toast.error(
//           error.response?.data?.message ||
//             "Failed to send password reset email."
//         );
//       }
//     },
//   });
//   return (
//     <div className="my-20">
//       <Navbar />
//       <div className="flex items-center justify-center max-w-7xl mx-auto">
//         <form
//           onSubmit={formik.handleSubmit}
//           className="w-1/2 border border-gray-200 rounded-md p-6 my-10"
//         >
//           <h1 className="font-bold text-xl mb-5">Forgot Password</h1>
//           <p className="mb-4 text-gray-600">
//             Enter your registered email address. We'll send you a link to reset
//             your password.
//           </p>

//           <div className="my-4">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               type="email"
//               id="email"
//               name="email"
//               value={formik.values.email}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Enter your email"
//             />
//             {formik.touched.email && formik.errors.email && (
//               <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
//             )}
//           </div>

//           <Button
//             type="submit"
//             className="w-full my-4 bg-blue-600 text-white hover:bg-blue-700"
//           >
//             Send Reset Link
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required."),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${USER_API_END_POINT}/forgot`, values, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/set-new-password", { state: { email: values.email } });
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } catch (error) {
        console.log(error);
        toast.error(
          error.response?.data?.message ||
            "Failed to send password reset email."
        );
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
          <h1 className="font-bold text-xl mb-5">Forgot Password</h1>
          <p className="mb-4 text-gray-600">
            Enter your registered email address. We'll send you a link to reset
            your password.
          </p>

          <div className="my-4">
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

          <Button
            type="submit"
            className="w-full my-4 bg-blue-600 text-white hover:bg-blue-700"
          >
            Send Reset Link
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
