import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";
import Navbar from "./components/common/Navbar";
import AuthPage from "./pages/AuthPage";
import Footer from "./components/common/Footer";
import College from "./pages/College";
import UpdateProfile from "./pages/UpdateProfile";
import AboutUs from "./pages/AboutUs";
import Collaboration from "./pages/Collaboration";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<College />} />
        <Route path="*" element={<College />} />
        <Route path="/collaboration" element={<Collaboration />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
};

export default App;
