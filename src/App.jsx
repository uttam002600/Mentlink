import React from "react";
import { Routes, Route } from "react-router-dom";

import "./index.css";
import Navbar from "./components/common/Navbar";
import AuthPage from "./pages/AuthPage";
import Footer from "./components/common/Footer";
import Global from "./pages/Global";
import College from "./pages/College";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<College />} />
        <Route path="*" element={<College />} />
        <Route path="/global" element={<Global />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
