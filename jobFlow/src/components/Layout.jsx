import React from "react";
import { Outlet } from "react-router-dom";

// Navbar Component
const Navbar = () => (
  <nav className="bg-white shadow-md">
    <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="/" className="text-2xl font-bold text-gray-900">
        JobPortal
      </a>
      <div>
        <a
          href="/login"
          className="text-gray-700 hover:text-gray-900 px-4 py-2"
        >
          Login
        </a>
        <a
          href="/register"
          className="text-gray-700 hover:text-gray-900 px-4 py-2"
        >
          Register
        </a>
      </div>
    </div>
  </nav>
);

// Header Component
const Header = () => (
  <header className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-center py-10">
    <h1 className="text-3xl font-bold">Welcome to JobPortal</h1>
    <p className="text-xl mt-2">
      Create your account and start exploring job opportunities!
    </p>
  </header>
);

// Layout Component
const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <Header />
    <main className="flex-grow bg-gradient-to-r from-purple-100 to-blue-100">
      <div className="max-w-6xl mx-auto p-4">
        <Outlet /> {/* Renders the current route's component */}
      </div>
    </main>
  </div>
);

export default Layout;
