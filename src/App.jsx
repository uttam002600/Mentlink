import React, { useState } from "react";

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
      {/* <College /> */}
      {/* <AuthPage /> */}
      <Global />
      <Footer />
    </>
  );
};

export default App;
