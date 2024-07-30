import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AppliedJobs from "./pages/AppliedJobs";
import SavedJobs from "./pages/SavedJobs";
import Login from "./pages/Login";
import Register from "./pages/Register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/applied" element={<AppliedJobs />} />
      <Route path="/saved" element={<SavedJobs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
