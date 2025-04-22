import React, { useContext } from "react";
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
import MentorDashboard from "./pages/MentorDashboard";
import { ApiContext } from "./Context/ContextProvider";
import MenteeDashboard from "./pages/MenteeDashboard";
import MentorAvailability from "./components/Internal-Page/MentorAvailability";
import Settings from "./pages/Settings";

const App = () => {
  const { authUser: user } = useContext(ApiContext);
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
        <Route
          path="/mentor/:mentorId/availability"
          element={<MentorAvailability />}
        />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/dashboard"
          element={
            user?.role == "MENTOR" ? <MentorDashboard /> : <MenteeDashboard />
          }
        />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
};

export default App;
