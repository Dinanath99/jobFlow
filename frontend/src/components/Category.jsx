import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";

const Category = () => {
  const Category = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Devops",
    "Data engineer",
    "Education and teaching jobs",
  ];
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {Category.map((category, index) => (
            <CarouselItem className="md:basis-1/3 lg-basis-1/2">
              <Button
                variant="outline"
                className="rounded-full bg-[#0d26a5] text-white"
              >
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Category;
