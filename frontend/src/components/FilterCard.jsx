import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Label } from "@radix-ui/react-label";
import { ChevronDown } from "lucide-react"; // Import an icon for dropdown effect
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const filterData = [
  {
    filterType: "Location",
    array: ["kathmandu", "Pokhara", "Lalitpur"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5 lakh"],
  },
];

const FilterCard = () => {
  
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  // return (
  //   <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-1 my-12">
  //     <h1 className="font-bold text-2xl text-center mb-2">Filter Jobs</h1>
  //     <div className="space-y-1">
  //       {filterData.map((data, index) => (
  //         <div
  //           key={index}
  //           className="border rounded-md p-1 hover:shadow-lg transition-shadow duration-300"
  //         >
  //           <div className="flex justify-between items-center cursor-pointer">
  //             <h2 className="font-semibold text-lg">{data.filterType}</h2>
  //             <ChevronDown className="h-5 w-5 text-gray-500" />
  //           </div>
  //           <RadioGroup
  //             value={selectedValue}
  //             onValueChange={changeHandler}
  //             className="mt-2"
  //           >
  //             {data.array.map((item, idx) => {
  //               const itemId = `id${index}-${idx}`;
  //               return (
  //                 <div className="flex items-center my-2" key={itemId}>
  //                   <RadioGroupItem
  //                     value={item}
  //                     id={itemId}
  //                     className="hidden peer"
  //                   />
  //                   <Label
  //                     htmlFor={itemId}
  //                     className="flex items-center p-2 border border-gray-300 rounded-md cursor-pointer bg-white text-gray-800 peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-checked:text-white transition duration-300"
  //                   >
  //                     {item}
  //                   </Label>
  //                 </div>
  //               );
  //             })}
  //           </RadioGroup>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );

return (
  <div className="w-full bg-white p-3 rounded-md my-28">
    <h1 className="font-bold text-lg">Filter Jobs</h1>
    <hr className="mt-3" />
    <RadioGroup value={selectedValue} onValueChange={changeHandler}>
      {filterData.map((data, index) => (
        <div>
          <h1 className="font-bold text-lg">{data.filterType}</h1>
          {data.array.map((item, idx) => {
            const itemId = `id${index}-${idx}`;
            return (
              <div className="flex items-center space-x-2 my-2">
                <RadioGroupItem value={item} id={itemId} />
                <Label htmlFor={itemId}>{item}</Label>
              </div>
            );
          })}
        </div>
      ))}
    </RadioGroup>
  </div>
);
};

export default FilterCard;
