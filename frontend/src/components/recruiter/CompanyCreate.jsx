// import React, { useState } from "react";
// import Navbar from "../shared/Navbar";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { COMPANY_API_END_POINT } from "@/utils/constant";
// import { useDispatch } from "react-redux";
// import { setSingleCompany } from "@/redux/companySlice";

// const CompanyCreate = () => {
//   const navigate = useNavigate();
//   const [companyName, setCompanyName] = useState();
//   const dispatch = useDispatch;
//   const registerNewCompany = async () => {
//     try {
//       const res = await axios.post(
//         `${COMPANY_API_END_POINT}/register`,
//         { companyName },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );

//       //check if the response is success
//       if (res.data.success) {
//         dispatch(setSingleCompany(res.data.company));
//         toast.success(res.data.message);
//         const companyId = res?.data?.company?._id;
//         navigate(`/recruiter/companies/${companyId}`);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-4xl mx-auto">
//         <div className="my-10">
//           <h1 className="font-bold text-2xl"> Your Company Name</h1>
//           <p className="text-gray-500">
//             what would you like to give your company name
//           </p>
//         </div>
//         <Label>Company Name</Label>
//         <Input
//           type="text"
//           className="my-2"
//           placeholder="JobFlow, esewa,khalti, etc"
//           onChange={(e) => setCompanyName(e.target.value)}
//         />
//         <div className="flex items-center gap-2 my-10">
//           <Button
//             variant="outline"
//             className="bg-red-600 text-white"
//             onClick={() => navigate("/recruiter/companies")}
//           >
//             Cancel
//           </Button>
//           <Button onClick={registerNewCompany}> Continue</Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanyCreate;

import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { toast } from "sonner";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch(); // Call useDispatch as a function

  const registerNewCompany = async () => {
    if (!companyName) {
      toast.error("Company name is required");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:4000/api/v1/company/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/recruiter/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to name your company?
          </p>
        </div>
        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="JobFlow, esewa, khalti, etc."
          value={companyName} // Ensure the input is controlled
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            className="bg-red-600 text-white"
            onClick={() => navigate("/recruiter/companies")}
          >
            Cancel
          </Button>
          <Button onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
