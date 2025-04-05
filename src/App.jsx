import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";
import Navbar from "./components/common/Navbar";
import AuthPage from "./pages/AuthPage";
import Footer from "./components/common/Footer";
import Global from "./pages/Global";
import College from "./pages/College";
import UpdateProfile from "./pages/UpdateProfile";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<College />} />
        <Route path="*" element={<College />} />
        <Route path="/global" element={<Global />} />
        <Route path="/auth" element={<AuthPage />} />
        {/* <Route path="/update-profile" element={<UpdateProfile />} /> */}
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
};

export default App;
