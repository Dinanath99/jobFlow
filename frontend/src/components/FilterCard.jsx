import { setSearchedQuery } from "@/redux/jobSlice";
import { Label } from "@radix-ui/react-label";
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
  }, [selectedValue]); //call the function when selectedValue changes
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => {
          return (
            <div key={index}>
              <h1 className="font-bold text-lg">{data.filterType}</h1>
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div className="flex items-center space-x-2 my-2" key={index}>
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId}>{item}</Label>
                  </div>
                );
              })}
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
