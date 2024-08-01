import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Job Portal</h1>
          <div>
            <a href="/" className="text-gray-300 hover:text-white mx-2">
              Home
            </a>
            <a href="/login" className="text-gray-300 hover:text-white mx-2">
              Login
            </a>
            <a href="/register" className="text-gray-300 hover:text-white mx-2">
              Register
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
