import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
const [input, setInput] = useState({
  email: "",
  password: "",

  role: "",
});

const changeEventHandler = (e) => {
  setInput({
    ...input, //spreading the input object
    [e.target.name]: e.target.value, // setting the value of the input field
  });
};

const changeFileHandler = (e) => {
  setInput({
    ...input,
    file: e.target.files?.[0],
  });
};

const submitHandler = (e) => {
  e.preventDefault();
};

const Login = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w 7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="my-2">
            <Label htmlFor="name">Email</Label>
            <Input
              type="text"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your email"
            />
          </div>
          <div className="my-2">
            <Label htmlFor="name">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="applicant"
                  checked={input.role === "applicant"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Applicant</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full my-4">
            Login
          </Button>
          <span className="text-sm">
            Don't have an account?
            <Link to="/signup" className="text-blue-700">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
