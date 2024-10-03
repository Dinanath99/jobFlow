// import useGetAppliedJob from "@/hooks/useGetAppliedJob";
// import { Label } from "@radix-ui/react-label";
// import { Contact, Mail, Pen } from "lucide-react";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import AppliedJobTable from "./AppliedJobTable";
// import Navbar from "./shared/Navbar";
// import { Avatar, AvatarImage } from "./ui/avatar";
// import { Badge } from "./ui/badge";
// import { Button } from "./ui/button";
// import UpdateProfileDialog from "./UpdateProfileDialog";

// //const skills = ["React", "Node", "Express", "MongoDB"];

// const isResume = true;
// const Profile = () => {
//   useGetAppliedJob();
//   const [open, setOpen] = useState(false);
//   const { user } = useSelector((store) => store.auth);
//   console.log("User Data:", user);
//   console.log("Skills:", user?.profile?.skills);

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-20 p-8">
//         <div className="flex justify-between">
//           <div className="flex items-center gap-4">
//             <Avatar className="h-24 w-24">
//               <AvatarImage
//                 src={user?.profile?.profilePhoto}
//                 alt="error loading image"
//               />
//             </Avatar>
//             <div>
//               <h1 className="font-medium text-xl">{user?.fullname}</h1>
//               <p>{user?.profile?.bio}</p>
//             </div>
//           </div>
//           <Button
//             onClick={() => setOpen(true)}
//             className="text-right"
//             variant="outline"
//           >
//             <Pen />
//           </Button>
//         </div>
//         <div className="my-5">
//           <div className="flex items-center gap-3 my-2">
//             <Mail /> <span>{user?.email}</span>
//           </div>
//           <div className="flex items-center gap-3 my-2">
//             <Contact /> <span>{user?.phoneNumber}</span>
//           </div>
//         </div>
//         <div className="my-5">
//           <h1>skills</h1>
//           <div className="flex items-center gap-1">
//             {user?.profile?.skills.length !== 0 ? (
//               user?.profile?.skills.map((item, index) => (
//                 <Badge key={index}>{item}</Badge>
//               ))
//             ) : (
//               <span>NA</span>
//             )}
//           </div>
//         </div>
//         <div className="grid w-full max-w-sm items-center gap-1.5">
//           <Label className="text-md font-bold">Resume</Label>
//           {isResume ? (
//             <a
//               target="blank"
//               href={user?.profile?.resume}
//               className="text-blue-500 w-full hover:underline cursor-pointer"
//             >
//               {user?.profile?.resumeOriginalName}
//             </a>
//           ) : (
//             <span>NA</span>
//           )}
//         </div>
//         <div className="max-w-4xl mx-auto bg-white rounded-2xl">
//           <h1 className="font-bold text-lg my-5">Applied jobs</h1>
//           {/* application  table */}
//           <AppliedJobTable />
//         </div>
//         <UpdateProfileDialog open={open} setOpen={setOpen} />
//       </div>
//     </div>
//   );
// };

// export default Profile;
import useGetAppliedJob from "@/hooks/useGetAppliedJob";
import { Label } from "@radix-ui/react-label";
import { Building, Contact, Mail, Pen } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import AppliedJobTable from "./AppliedJobTable";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import UpdateProfileDialog from "./UpdateProfileDialog";

//const skills = ["React", "Node", "Express", "MongoDB"];

const isResume = true;
const Profile = () => {
  useGetAppliedJob();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  console.log("User Data:", user);
  console.log("Skills:", user?.profile?.skills);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-20 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt="error loading image"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail /> <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact /> <span>{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Applicant Profile Section */}
        {user?.role === "Applicant" && (
          <>
            <div className="my-5">
              <h1>Skills</h1>
              <div className="flex items-center gap-1">
                {user?.profile?.skills.length !== 0 ? (
                  user?.profile?.skills.map((item, index) => (
                    <Badge key={index}>{item}</Badge>
                  ))
                ) : (
                  <span>NA</span>
                )}
              </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="text-md font-bold">Resume</Label>
              {isResume ? (
                <a
                  target="blank"
                  href={user?.profile?.resume}
                  className="text-blue-500 w-full hover:underline cursor-pointer"
                >
                  {user?.profile?.resumeOriginalName}
                </a>
              ) : (
                <span>NA</span>
              )}
            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl">
              <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
              {/* Applied Job Table */}
              <AppliedJobTable />
            </div>
          </>
        )}

        {/* Recruiter Profile Section */}
        {user?.role === "Recruiter" && (
          <>
            <div className="my-5">
              <h1>Company Information</h1>
              <div className="flex items-center gap-3 my-2">
                <Building />
                <span>
                  {user?.profile?.company?.name || "No Company Assigned"}
                </span>
              </div>
              <div className="my-5">
                <h1>Company Description</h1>
                <p>
                  {user?.profile?.company?.description ||
                    "No description provided"}
                </p>
              </div>
            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl">
              <h1 className="font-bold text-lg my-5"></h1>
              {/* Here you can add a component or table for managing posted jobs */}
              <div></div>
            </div>
          </>
        )}
        <UpdateProfileDialog open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Profile;
