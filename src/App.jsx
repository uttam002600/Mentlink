import React, { useState } from "react";

import "./index.css";
import Navbar from "./components/common/Navbar";
import AuthPage from "./pages/AuthPage";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Navbar />
      <AuthPage />
      {/* <Home /> */}
      <Footer />
    </>
  );
};

export default App;
