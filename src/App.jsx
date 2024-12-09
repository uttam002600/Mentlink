import React, { useState } from "react";

import "./index.css";
import Navbar from "./components/common/Navbar";
import AuthPage from "./pages/AuthPage";
import Footer from "./components/common/Footer";
import Global from "./pages/Global";

const App = () => {
  return (
    <>
      <Navbar />
      {/* <AuthPage /> */}
      <Global />
      <Footer />
    </>
  );
};

export default App;
