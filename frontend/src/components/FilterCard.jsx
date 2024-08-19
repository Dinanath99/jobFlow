import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import React from "react";
import { Label } from "@radix-ui/react-label";

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
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter jobs</h1>
      <hr className="mt-3" />
      <RadioGroup>
        {filterData.map((data, index) => {
          return (
            <div key={index}>
              <h1 className="font-bold text-lg">{data.filterType}</h1>
              {data.array.map((item, index) => {
                return (
                  <div className="flex items-center space-x-2 my-2">
                    <RadioGroupItem value={item} />
                    <Label>{item}</Label>
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
