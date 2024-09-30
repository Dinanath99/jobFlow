import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
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
const shortListingStatus = ["accepted", "Rejected"];

// const ApplicantsTable = () => {
//   const { applicants } = useSelector((store) => store.application);
//   const statusHandler = async (status, id) => {
//     try {
//       const res = await axios.post(
//         `${APPLICATION_API_END_POINT}/status/${id}/update`,
//         {
//           status,
//         },
//         { withCredentials: true }
//       );
//       if (res.data.success) {
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };
//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of your recent applied user</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>FullName</TableHead>
//             <TableHead>Email</TableHead>
//             <TableHead>Contact</TableHead>
//             <TableHead>Resume</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {applicants &&
//             applicants.applications.map((item) => (
//               <tr key={item._id}>
//                 <TableCell>{item?.applicant?.fullname}</TableCell>
//                 <TableCell>{item?.applicant?.email}</TableCell>
//                 <TableCell>{item?.applicant?.phoneNumber}</TableCell>
//                 <TableCell className="text-blue-600 cursor-pointer">
//                   {item.applicant?.profile?.resume ? (
//                     <a
//                       href={item?.applicant?.profile?.resumeOriginalName}
//                       target="_blank"
//                       rel="noreferrer"
//                     >
//                       {item?.applicant?.profile?.resumeOriginalName}
//                     </a>
//                   ) : (
//                     <span>NA</span>
//                   )}
//                 </TableCell>
//                 <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
//                 <TableCell className="float-right cursor-pointer">
//                   <Popover>
//                     <PopoverTrigger>
//                       <MoreHorizontal />
//                     </PopoverTrigger>
//                     <PopoverContent className="w-32">
//                       {shortListingStatus.map((status, index) => {
//                         return (
//                           <div
//                             onClick={() => statusHandler(status, item?._id)}
//                             key={index}
//                             className="flex w-fit items-center my-2 cursor-pointer"
//                           >
//                             <span>{status}</span>
//                           </div>
//                         );
//                       })}
//                     </PopoverContent>
//                   </Popover>
//                 </TableCell>
//               </tr>
//             ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  // Check if applications are defined before mapping
  const applications = applicants?.applications || [];

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        {
          status,
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.length > 0 ? (
            applications.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell className="text-blue-600 cursor-pointer">
                  {item.applicant?.profile?.resume ? (
                    <a
                      href={item?.applicant?.profile?.resumeOriginalName}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                <TableCell className="float-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortListingStatus.map((status, index) => (
                        <div
                          onClick={() => statusHandler(status, item?._id)}
                          key={index}
                          className="flex w-fit items-center my-2 cursor-pointer"
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
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
