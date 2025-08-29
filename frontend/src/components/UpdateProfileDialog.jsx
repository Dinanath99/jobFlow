// import { Label } from "./ui/label";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "./ui/dialog";
// import React, { useState } from "react";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { Loader2 } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { USER_API_END_POINT } from "@/utils/constant";
// import { setUser } from "@/redux/authSlice";
// import { toast } from "sonner";

// const UpdateProfileDialog = ({ open, setOpen }) => {
//   const [loading, setLoading] = useState(false);
//   const { user } = useSelector((state) => state.auth);
//   const [input, setInput] = useState({
//     fullname: user?.fullname || "",
//     email: user?.email || "",
//     phoneNumber: user?.phoneNumber || "",
//     bio: user?.profile?.bio || "",
//     skills: user?.profile?.skills?.join(", ") || "", // Join skills into a string for input
//     file: null,
//   });

//   const dispatch = useDispatch();

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const fileChangeHandler = (e) => {
//     const file = e.target.files?.[0];
//     setInput({ ...input, file });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("fullname", input.fullname);
//     formData.append("email", input.email);
//     formData.append("phoneNumber", input.phoneNumber);
//     formData.append("bio", input.bio);
//     formData.append("skills", input.skills.split(", ")); // Split skills from string back to array
//     if (input.file) {
//       formData.append("resume", input.file);
//     }

//     try {
//       const res = await axios.post(
//         `${USER_API_END_POINT}/profile/update`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         dispatch(setUser(res.data.user));
//         toast.success(res.data.message);
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.error("Profile update failed:", error);
//       toast.error(error.response?.data?.message || "Profile update failed.");
//     }

//     setLoading(false);
//     setOpen(false);
//   };

//   return (
//     <Dialog open={open}>
//       <DialogContent
//         className="sm:max-w-[425px]"
//         onInteractOutside={() => setOpen(false)}
//       >
//         <DialogHeader>
//           <DialogTitle>Update Profile</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={submitHandler}>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="fullname" className="text-right">
//                 Name
//               </Label>
//               <Input
//                 id="fullname"
//                 name="fullname"
//                 type="text"
//                 value={input.fullname}
//                 onChange={changeEventHandler}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="email" className="text-right">
//                 Email
//               </Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={input.email}
//                 onChange={changeEventHandler}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="phoneNumber" className="text-right">
//                 Number
//               </Label>
//               <Input
//                 id="phoneNumber"
//                 name="phoneNumber"
//                 value={input.phoneNumber}
//                 onChange={changeEventHandler}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="bio" className="text-right">
//                 Bio
//               </Label>
//               <Input
//                 id="bio"
//                 name="bio"
//                 value={input.bio}
//                 onChange={changeEventHandler}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="skills" className="text-right">
//                 Skills
//               </Label>
//               <Input
//                 id="skills"
//                 name="skills"
//                 value={input.skills}
//                 onChange={changeEventHandler}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="file" className="text-right">
//                 Resume
//               </Label>
//               <Input
//                 id="file"
//                 name="file"
//                 type="file"
//                 accept="application/pdf"
//                 onChange={fileChangeHandler}
//                 className="col-span-3"
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             {loading ? (
//               <Button className="w-full my-4">
//                 <Loader2 className="mr-2 h-4 animate-spin" />
//                 Please wait
//               </Button>
//             ) : (
//               <Button type="submit" className="w-full my-4">
//                 Update
//               </Button>
//             )}
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default UpdateProfileDialog;

import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "", // Join skills into a string for input
    file: user?.profile?.resume || "",
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills.split(", ")); // Split skills from string back to array
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.put(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error(error.response?.data?.message || "Profile update failed.");
    }

    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={() => setOpen(false)}
        aria-describedby="update-profile-description"
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <p id="update-profile-description" className="sr-only">
          Update your profile details including name, email, phone number, bio,
          skills, and resume.
        </p>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname" className="text-right">
                Name
              </Label>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                value={input.fullname}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={input.email}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                Number
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Input
                id="bio"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <Input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                Resume
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                // // accept="application/pdf"
                onChange={fileChangeHandler}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4">
                <Loader2 className="mr-2 h-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
