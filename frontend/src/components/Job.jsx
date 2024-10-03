// import useGetAllJobs from "@/hooks/useGetAllJobs";
// import { Bookmark } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Avatar, AvatarImage } from "./ui/avatar";
// import { Badge } from "./ui/badge";
// import { Button } from "./ui/button";

// const Job = ({ job }) => {
//   useGetAllJobs();
//   const navigate = useNavigate();

//   // State to manage bookmark status
//   const [isBookmarked, setIsBookmarked] = useState(false);

//   // Function to calculate days ago
//   const daysAgoFunction = (mongodbTime) => {
//     const createdAt = new Date(mongodbTime);
//     const currentTime = new Date();
//     const timeDifference = currentTime - createdAt;
//     return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//   };

//   // Handle bookmark toggle
//   const toggleBookmark = () => {
//     setIsBookmarked((prev) => !prev);
//   };

//   // Store bookmarks in local storage
//   useEffect(() => {
//     const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
//     const isJobBookmarked = bookmarks.includes(job?._id);
//     setIsBookmarked(isJobBookmarked);
//   }, [job]);

//   // Persist bookmarks in local storage
//   useEffect(() => {
//     const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
//     if (isBookmarked) {
//       // Add job ID to bookmarks
//       if (!bookmarks.includes(job?._id)) {
//         bookmarks.push(job?._id);
//       }
//     } else {
//       // Remove job ID from bookmarks
//       const filteredBookmarks = bookmarks.filter((id) => id !== job?._id);
//       localStorage.setItem("bookmarks", JSON.stringify(filteredBookmarks));
//       return;
//     }
//     localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
//   }, [isBookmarked, job]);

//   return (
//     <div className="p-4 rounded-md shadow-xl bg-white border border-gray-100 my-20 m-1 mb-1">
//       <div className="flex items-center justify-between ">
//         <p className="text-sm text-gray-500">
//           {daysAgoFunction(job?.createdAt) === 0
//             ? "Today"
//             : `${daysAgoFunction(job?.createdAt)} days ago`}
//         </p>
//         <Button
//           variant="outline"
//           className="rounded-full"
//           size="icon"
//           onClick={toggleBookmark}
//         >
//           <Bookmark
//             className={`text-${isBookmarked ? "yellow-500" : "gray-500"}`}
//           />
//         </Button>
//       </div>
//       <div className="flex items-center gap-2 my-2">
//         <Button className="p-6" variant="outline" size="icon">
//           <Avatar>
//             <AvatarImage src={job?.company?.logo} />
//           </Avatar>
//         </Button>
//         <div>
//           <h1 className="font-medium text-lg">{job?.company?.name}</h1>
//           <p>{job?.company?.location}</p>
//         </div>
//       </div>
//       <div>
//         <h1 className="font-bold text-lg my-1">{job?.title}</h1>
//         <p className="text-sm text-gray-600">{job?.description}</p>
//       </div>
//       <div className="flex items-center gap-2 mt-2">
//         <Badge className="text-blue-700 font-bold bg-slate-200 hover:bg-slate-400">
//           Position: {job?.position}
//         </Badge>
//         <Badge className="text-[#F83002] font-bold bg-slate-200 hover:bg-slate-400">
//           {job?.jobType}
//         </Badge>
//         <Badge className="text-[#7209b7] font-bold bg-slate-200 hover:bg-slate-400">
//           Salary: {job?.salary}
//         </Badge>
//       </div>
//       <div className="flex items-center gap-4 mt-2">
//         <Button
//           onClick={() => {
//             navigate(`/description/${job?._id}`);
//           }}
//           variant="outline"
//         >
//           Details
//         </Button>
//         <Button className="bg-[#7209b7]">Save For Later</Button>
//       </div>
//     </div>
//   );
// };

// export default Job;

// import useGetAllJobs from "@/hooks/useGetAllJobs";
// import { Bookmark } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Avatar, AvatarImage } from "./ui/avatar";
// import { Badge } from "./ui/badge";
// import { Button } from "./ui/button";

// const Job = ({ job }) => {
//   useGetAllJobs();
//   const navigate = useNavigate();

//   // State to manage bookmark status
//   const [isBookmarked, setIsBookmarked] = useState(false);

//   // Function to calculate days ago
//   const daysAgoFunction = (mongodbTime) => {
//     const createdAt = new Date(mongodbTime);
//     const currentTime = new Date();
//     const timeDifference = currentTime - createdAt;
//     return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//   };

//   // Handle bookmark toggle
//   const toggleBookmark = () => {
//     setIsBookmarked((prev) => !prev);
//   };

//   // Store bookmarks in local storage
//   useEffect(() => {
//     const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
//     const isJobBookmarked = bookmarks.includes(job?._id);
//     setIsBookmarked(isJobBookmarked);
//   }, [job]);

//   // Persist bookmarks in local storage
//   useEffect(() => {
//     const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
//     if (isBookmarked) {
//       // Add job ID to bookmarks
//       if (!bookmarks.includes(job?._id)) {
//         bookmarks.push(job?._id);
//       }
//     } else {
//       // Remove job ID from bookmarks
//       const filteredBookmarks = bookmarks.filter((id) => id !== job?._id);
//       localStorage.setItem("bookmarks", JSON.stringify(filteredBookmarks));
//       return;
//     }
//     localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
//   }, [isBookmarked, job]);

//   return (
//     <div
//       className="p-4 rounded-md shadow-xl bg-white border border-gray-100 my-28 m-1 mb-1 transition-all duration-300 ease-in-out min-h-[300px] hover:shadow-2xl hover:scale-[1.02]"
//       style={{ maxWidth: "600px" }}
//     >
//       <div className="flex items-center justify-between">
//         <p className="text-sm text-gray-500">
//           {daysAgoFunction(job?.createdAt) === 0
//             ? "Today"
//             : `${daysAgoFunction(job?.createdAt)} days ago`}
//         </p>
//         <Button
//           variant="outline"
//           className="rounded-full"
//           size="icon"
//           onClick={toggleBookmark}
//         >
//           <Bookmark
//             className={`text-${isBookmarked ? "yellow-500" : "gray-500"}`}
//           />
//         </Button>
//       </div>
//       <div className="flex items-center gap-2 my-2">
//         <Button className="p-6" variant="outline" size="icon">
//           <Avatar>
//             <AvatarImage src={job?.company?.logo} />
//           </Avatar>
//         </Button>
//         <div>
//           <h1 className="font-medium text-lg">{job?.company?.name}</h1>
//           <p>{job?.company?.location}</p>
//         </div>
//       </div>
//       <div>
//         <h1 className="font-bold text-lg my-1">{job?.title}</h1>
//         <p className="text-sm text-gray-600 line-clamp-3 transition-all duration-300 ease-in-out overflow-hidden max-h-[72px]">
//           {job?.description}
//         </p>
//       </div>
//       <div className="flex items-center gap-2 mt-2">
//         <Badge className="text-blue-700 font-bold bg-slate-200 hover:bg-slate-400">
//           Position: {job?.position}
//         </Badge>
//         <Badge className="text-[#F83002] font-bold bg-slate-200 hover:bg-slate-400">
//           {job?.jobType}
//         </Badge>
//         <Badge className="text-[#7209b7] font-bold bg-slate-200 hover:bg-slate-400">
//           Salary: {job?.salary}
//         </Badge>
//       </div>
//       <div className="flex items-center gap-4 mt-2">
//         <Button
//           onClick={() => {
//             navigate(`/description/${job?._id}`);
//           }}
//           variant="outline"
//         >
//           Details
//         </Button>
//         <Button className="bg-[#7209b7]">Save For Later</Button>
//       </div>
//     </div>
//   );
// };

// export default Job;


import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const Job = ({ job }) => {
  const navigate = useNavigate();

  // State to manage bookmark status
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Function to calculate days ago
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  // Handle bookmark toggle
  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  // Store bookmarks in local storage
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const isJobBookmarked = bookmarks.includes(job?._id);
    setIsBookmarked(isJobBookmarked);
  }, [job]);

  // Persist bookmarks in local storage
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    if (isBookmarked) {
      // Add job ID to bookmarks
      if (!bookmarks.includes(job?._id)) {
        bookmarks.push(job?._id);
      }
    } else {
      // Remove job ID from bookmarks
      const filteredBookmarks = bookmarks.filter((id) => id !== job?._id);
      localStorage.setItem("bookmarks", JSON.stringify(filteredBookmarks));
      return;
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [isBookmarked, job]);

  return (
    <div
      className="p-4 rounded-md shadow-xl bg-white border border-gray-100 my-28 m-1 mb-1 transition-all duration-300 ease-in-out min-h-[300px] hover:shadow-2xl hover:scale-[1.02]"
      style={{ maxWidth: "600px" }}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full"
          size="icon"
          onClick={toggleBookmark}
        >
          <Bookmark
            className={`text-${isBookmarked ? "yellow-500" : "gray-500"}`}
          />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p>{job?.company?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-1">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-3 transition-all duration-300 ease-in-out overflow-hidden max-h-[72px]">
          {job?.description}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Badge className="text-blue-700 font-bold bg-slate-200 hover:bg-slate-400">
          Position: {job?.position}
        </Badge>
        <Badge className="text-[#F83002] font-bold bg-slate-200 hover:bg-slate-400">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold bg-slate-200 hover:bg-slate-400">
          Salary: {job?.salary}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-2">
        <Button
          onClick={() => {
            navigate(`/description/${job?._id}`);
          }}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
