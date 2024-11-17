// import { APPLICATION_API_END_POINT } from "@/utils/constant";
// import axios from "axios";
// import { MoreHorizontal } from "lucide-react";
// import { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css"; // Import calendar CSS
// import { useSelector } from "react-redux";
// import { toast } from "sonner";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";

// const shortListingStatus = ["accepted", "rejected"];

// const ApplicantsTable = () => {
//   const { applicants } = useSelector((store) => store.application);

//   // State to manage popover visibility
//   const [openPopoverId, setOpenPopoverId] = useState(null);

//   // State to manage the selected interview date for each applicant
//   const [selectedDates, setSelectedDates] = useState({});

//   // State to manage the status and interview date of each applicant from local storage
//   const [applicantStatuses, setApplicantStatuses] = useState({});

//   // Check if applications are defined before mapping
//   const applications = applicants?.applications || [];

//   useEffect(() => {
//     // Load applicant statuses from local storage when the component mounts
//     const storedStatuses =
//       JSON.parse(localStorage.getItem("applicantStatuses")) || {};
//     setApplicantStatuses(storedStatuses);
//   }, []);

//   const handleDateChange = (date, id) => {
//     setSelectedDates((prev) => ({ ...prev, [id]: date }));
//   };

//   const statusHandler = async (status, id) => {
//     const interviewDate = selectedDates[id];
//     if (!interviewDate) {
//       toast.error("Please select an interview date before accepting.");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         `${APPLICATION_API_END_POINT}/status/${id}/update`,
//         {
//           status,
//           interviewDate, // Include the selected interview date
//         },
//         { withCredentials: true }
//       );
//       if (res.data.success) {
//         toast.success(res.data.message);
//         // Update status and date in state and local storage
//         setApplicantStatuses((prev) => {
//           const updatedStatuses = { ...prev, [id]: { status, interviewDate } };
//           localStorage.setItem(
//             "applicantStatuses",
//             JSON.stringify(updatedStatuses)
//           );
//           return updatedStatuses;
//         });
//         setOpenPopoverId(null); // Close popover on successful status update
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error updating status");
//     }
//   };

//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of your recent applied users</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>FullName</TableHead>
//             <TableHead>Email</TableHead>
//             <TableHead>Contact</TableHead>
//             <TableHead>Resume</TableHead>
//             <TableHead>Date Applied</TableHead>
//             <TableHead>Interview Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {applications.length > 0 ? (
//             applications.map((item) => {
//               const applicantStatus = applicantStatuses[item._id] || {};
//               const status = applicantStatus.status;
//               const interviewDate = applicantStatus.interviewDate
//                 ? new Date(applicantStatus.interviewDate).toLocaleDateString()
//                 : "";

//               return (
//                 <TableRow
//                   key={item._id}
//                   className={
//                     status === "accepted"
//                       ? "bg-green-500 rounded"
//                       : status === "rejected"
//                       ? "bg-red-500 rounded"
//                       : ""
//                   }
//                 >
//                   <TableCell>{item?.applicant?.fullname || "NA"}</TableCell>
//                   <TableCell>{item?.applicant?.email || "NA"}</TableCell>
//                   <TableCell>{item?.applicant?.phoneNumber || "NA"}</TableCell>
//                   <TableCell className="text-blue-600 cursor-pointer">
//                     {item.applicant?.profile?.resume ? (
//                       <a
//                         // href={item?.applicant?.profile?.resumeOriginalName}
//                         href={item?.applicant?.profile?.resume}
//                         target="_blank"
//                         rel="noreferrer"
//                       >
//                         {item?.applicant?.profile?.resumeOriginalName}
//                       </a>
//                     ) : (
//                       <span>NA</span>
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     {item?.applicant?.createdAt
//                       ? item?.applicant?.createdAt.split("T")[0]
//                       : "NA"}
//                   </TableCell>
//                   <TableCell>
//                     <DatePicker
//                       selected={selectedDates[item._id] || null}
//                       onChange={(date) => handleDateChange(date, item._id)}
//                       dateFormat="yyyy/MM/dd"
//                       placeholderText="Select a date"
//                       className="border p-2 rounded w-40"
//                       popperPlacement="right-start" // Ensure dropdown placement is handled
//                       popperModifiers={[
//                         {
//                           name: "preventOverflow",
//                           options: {
//                             boundary: "viewport", // Ensure it stays within viewport
//                           },
//                         },
//                       ]}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     {status === "accepted" ? interviewDate : "NA"}
//                   </TableCell>
//                   <TableCell className="float-right cursor-pointer">
//                     <Popover
//                       open={openPopoverId === item._id}
//                       onOpenChange={() =>
//                         setOpenPopoverId(
//                           openPopoverId === item._id ? null : item._id
//                         )
//                       }
//                     >
//                       <PopoverTrigger>
//                         <MoreHorizontal />
//                       </PopoverTrigger>
//                       <PopoverContent className="w-32">
//                         {shortListingStatus.map((status, index) => (
//                           <div
//                             onClick={() => statusHandler(status, item?._id)}
//                             key={index}
//                             className={`flex w-fit items-center my-2 cursor-pointer p-2 rounded ${
//                               status === "accepted"
//                                 ? "bg-green-200 hover:bg-green-500"
//                                 : "bg-red-200 hover:bg-red-500"
//                             }`}
//                           >
//                             <span>{status}</span>
//                           </div>
//                         ))}
//                       </PopoverContent>
//                     </Popover>
//                   </TableCell>
//                 </TableRow>
//               );
//             })
//           ) : (
//             <TableRow>
//               <TableCell colSpan={7} className="text-center">
//                 No applicants found.
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default ApplicantsTable;

import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import calendar CSS
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const shortListingStatus = ["accepted", "rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  // State to manage popover visibility
  const [openPopoverId, setOpenPopoverId] = useState(null);

  // State to manage the selected interview date for each applicant
  const [selectedDates, setSelectedDates] = useState({});

  // State to manage the status and interview date of each applicant from local storage
  const [applicantStatuses, setApplicantStatuses] = useState({});

  // Check if applications are defined before mapping
  const applications = applicants?.applications || [];

  useEffect(() => {
    // Load applicant statuses from local storage when the component mounts
    const storedStatuses =
      JSON.parse(localStorage.getItem("applicantStatuses")) || {};
    setApplicantStatuses(storedStatuses);
  }, []);

  const handleDateChange = (date, id) => {
    setSelectedDates((prev) => ({ ...prev, [id]: date }));
  };

  const statusHandler = async (status, id) => {
    const interviewDate = selectedDates[id];
    if (!interviewDate) {
      toast.error("Please select an interview date before accepting.");
      return;
    }

    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        {
          status,
          interviewDate, // Include the selected interview date
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        // Update status and date in state and local storage
        setApplicantStatuses((prev) => {
          const updatedStatuses = { ...prev, [id]: { status, interviewDate } };
          localStorage.setItem(
            "applicantStatuses",
            JSON.stringify(updatedStatuses)
          );
          return updatedStatuses;
        });
        setOpenPopoverId(null); // Close popover on successful status update
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating status");
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date Applied</TableHead>
            <TableHead>Interview Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.length > 0 ? (
            applications.map((item) => {
              const applicantStatus = applicantStatuses[item._id] || {};
              const status = applicantStatus.status;
              const interviewDate = applicantStatus.interviewDate
                ? new Date(applicantStatus.interviewDate).toLocaleDateString()
                : "";

              return (
                <TableRow
                  key={item._id}
                  className={
                    status === "accepted"
                      ? "bg-green-500 rounded"
                      : status === "rejected"
                      ? "bg-red-500 rounded"
                      : ""
                  }
                >
                  <TableCell>{item?.applicant?.fullname || "NA"}</TableCell>
                  <TableCell>{item?.applicant?.email || "NA"}</TableCell>
                  <TableCell>{item?.applicant?.phoneNumber || "NA"}</TableCell>
                  <TableCell className="text-blue-600 cursor-pointer">
                    {item.applicant?.profile?.resume ? (
                      <a
                        href={item?.applicant?.profile?.resume}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item?.applicant?.profile?.resumeOriginalName}
                      </a>
                    ) : (
                      <span>NA</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {item?.applicant?.createdAt
                      ? item?.applicant?.createdAt.split("T")[0]
                      : "NA"}
                  </TableCell>
                  <TableCell>
                    <DatePicker
                      selected={selectedDates[item._id] || null}
                      onChange={(date) => handleDateChange(date, item._id)}
                      dateFormat="yyyy/MM/dd"
                      placeholderText="Select a date"
                      className="border p-2 rounded w-40"
                      popperPlacement="right-start"
                      popperModifiers={[
                        {
                          name: "preventOverflow",
                          options: {
                            boundary: "viewport",
                          },
                        },
                      ]}
                      minDate={new Date()} // Prevent selection of past dates
                    />
                  </TableCell>
                  <TableCell className="float-right cursor-pointer">
                    <Popover
                      open={openPopoverId === item._id}
                      onOpenChange={() =>
                        setOpenPopoverId(
                          openPopoverId === item._id ? null : item._id
                        )
                      }
                    >
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        {shortListingStatus.map((status, index) => (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            key={index}
                            className={`flex w-fit items-center my-2 cursor-pointer p-2 rounded ${
                              status === "accepted"
                                ? "bg-green-200 hover:bg-green-500"
                                : "bg-red-200 hover:bg-red-500"
                            }`}
                          >
                            <span>{status}</span>
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No applicants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
