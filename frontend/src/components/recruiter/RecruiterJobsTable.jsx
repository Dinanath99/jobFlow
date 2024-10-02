// import { Edit2, Eye, MoreHorizontal } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
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

// const RecruiterJobsTable = () => {
//   const { companies = [] } = useSelector((store) => store.company);
//   console.log(companies);
//   const { allAdminJobs = [] } = useSelector((store) => store.job);
//   console.log(allAdminJobs);
//   const { searchJobByText } = useSelector((store) => store.job);
//   const [filterJobs, setFilterJobs] = useState(allAdminJobs);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const filteredJobs =
//       Array.isArray(companies) && allAdminJobs.length > 0
//         ? allAdminJobs.filter((job) => {
//             if (!searchJobByText) {
//               return true;
//             }
//             return (
//               job?.title
//                 ?.toLowerCase()
//                 .includes(searchJobByText.toLowerCase()) ||
//               job?.company?.name
//                 .toLowerCase()
//                 .includes(searchJobByText.toLowerCase())
//             );
//           })
//         : [];

//     setFilterJobs(filteredJobs);
//   }, [allAdminJobs, searchJobByText]);

//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of your recent posted jobs</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Company Name</TableHead>
//             <TableHead>Role</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {filterJobs.length === 0 ? (
//             <TableRow>
//               <TableCell colSpan={4} style={{ textAlign: "center" }}>
//                 Companies not found or not registered
//               </TableCell>
//             </TableRow>
//           ) : (
//             filterJobs.map((job) => (
//               <TableRow key={job._id}>
//                 <TableCell>{job?.company?.name}</TableCell>
//                 <TableCell>{job?.title}</TableCell>
//                 <TableCell>{job.createdAt.split("T")[0]}</TableCell>
//                 <TableCell className="text-right cursor-pointer">
//                   <Popover>
//                     <PopoverTrigger>
//                       <MoreHorizontal />
//                     </PopoverTrigger>
//                     <PopoverContent className="w-32">
//                       <div
//                         onClick={() =>
//                           navigate(`/recruiter/companies/${job._id}`)
//                         } // Update this line
//                         className="flex items-center gap-2 w-fit cursor-pointer"
//                       >
//                         <Edit2 className="w-4" />
//                         <span>Edit</span>
//                       </div>
//                       <div
//                         onClick={() =>
//                           navigate(`/recruiter/jobs/${job._id}/applicants`)
//                         }
//                         className="flex items-center w-fit gap-2 cursor-pointer mt-2"
//                       >
//                         <Eye className="w-4" />
//                         <span>Applicants</span>
//                       </div>
//                     </PopoverContent>
//                   </Popover>
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default RecruiterJobsTable;
// Import the deleteJob action

import { Edit2, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteJob, fetchJobs } from "../../redux/jobAction"; // Adjust the path as necessary
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useDispatch } from "react-redux";
import { Trash2 } from "lucide-react";
import { Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const RecruiterJobsTable = () => {
  const dispatch = useDispatch();
  const { companies = [] } = useSelector((store) => store.company);
  const { allAdminJobs = [] } = useSelector((store) => store.job);
  const { searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);


  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs =
      Array.isArray(companies) && allAdminJobs.length > 0
        ? allAdminJobs.filter((job) => {
            if (!searchJobByText) {
              return true;
            }
            return (
              job?.title
                ?.toLowerCase()
                .includes(searchJobByText.toLowerCase()) ||
              job?.company?.name
                .toLowerCase()
                .includes(searchJobByText.toLowerCase())
            );
          })
        : [];
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  // Handle delete action
  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (confirmDelete) {
      try {
        await dispatch(deleteJob(jobId)); // Dispatch the delete action
        await dispatch(fetchJobs()); // Optionally fetch the updated jobs list
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} style={{ textAlign: "center" }}>
                Jobs not found or not posted
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>
                  {new Date(job.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={
                          () => navigate(`/recruiter/jobs/${job._id}`) // Update this line as necessary
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() => handleDelete(job._id)} // Add delete functionality
                        className="flex items-center gap-2 w-fit cursor-pointer text-red-600"
                      >
                        <Trash2 className="w-4" />
                        <span>Delete</span>
                      </div>

                      <div
                      onClick={() =>
                         navigate(`/recruiter/jobs/${job._id}/applicants`)
                       }
                      className="flex items-center w-fit gap-2 cursor-pointer mt-2"                    >
                      <Eye className="w-4" />
                   <span>Applicants</span>
                </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecruiterJobsTable;
