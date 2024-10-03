// import { useSelector } from "react-redux";
// import { Badge } from "./ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "./ui/table";

// const AppliedJobTable = () => {
//   const { allAppliedJobs } = useSelector((store) => store.job);
//   console.log(allAppliedJobs);
//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of your applied jobs</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Date</TableHead>
//             <TableHead>Job Role</TableHead>
//             <TableHead>Company</TableHead>
//             <TableHead className="text-right">Status</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {allAppliedJobs.length <= 0 ? (
//             <span>You haven't applied any job</span>
//           ) : (
//             allAppliedJobs.map((appliedJob) => (
//               <TableRow key={appliedJob._id}>
//                 <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
//                 <TableCell>{appliedJob.job?.title}</TableCell>
//                 <TableCell>{appliedJob.job?.company?.name}</TableCell>
//                 <TableCell className="text-right">
//                   <Badge
//                     className={`${
//                       appliedJob?.status === "rejected"
//                         ? "bg-red-400"
//                         : appliedJob.status === "pending"
//                         ? "bg-gray-500"
//                         : "bg-green-300"
//                     }`}
//                   >
//                     {appliedJob.status}
//                   </Badge>
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default AppliedJobTable;

import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  console.log(allAppliedJobs);

  // Check if there are no applied jobs
  if (allAppliedJobs.length === 0) {
    return <p>You haven't applied to any jobs yet.</p>; // Show message instead of table
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.map((appliedJob) => (
            <TableRow key={appliedJob._id}>
              <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
              <TableCell>{appliedJob.job?.title}</TableCell>
              <TableCell>{appliedJob.job?.company?.name}</TableCell>
              <TableCell className="text-right">
                <Badge
                  className={`${
                    appliedJob?.status === "rejected"
                      ? "bg-red-400"
                      : appliedJob.status === "pending"
                      ? "bg-gray-500"
                      : "bg-green-300"
                  }`}
                >
                  {appliedJob.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
