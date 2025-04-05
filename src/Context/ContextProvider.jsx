import React, { createContext, useEffect, useState } from "react";
// import {
//   fetchMentors,
//   fetchMentees,
//   login,
//   register,
//   getRecommendations,
// } from "../services/api";

import { axiosInstance } from "../utils/axios.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const ApiContext = createContext();

const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  //Logic for Theme Toggle
  const [theme, setTheme] = useState("light"); // Default to light mode

  useEffect(() => {
    // Check if a theme is saved in localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply theme to body and save it in localStorage
    if (theme === "dark") {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  //Logic for dataFetching
  const [mentors, setMentors] = useState([]);
  const [mentees, setMentees] = useState([]);
  const [authUser, setAuthUser] = useState(null);
  const [authPage, setAuthPage] = useState("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //Loading state
  const [registerLoading, setRegisterLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // Methods for fetching data
  const loadMentors = async () => {
    const data = await fetchMentors();
    setMentors(data);
  };

  const loadMentees = async () => {
    const data = await fetchMentees();
    setMentees(data);
  };

  const handleLogin = async (formData) => {
    try {
      setLoginLoading(true);

      // 🔹 Call the login API
      const response = await axiosInstance.post("/auth/login", formData);

      const { user } = response.data.data;

      // 🔹 Update global auth context
      setAuthUser(user);
      setIsAuthenticated(true);
      console.log(user);

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      console.error("Login Error:", errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    if (registerLoading) {
      return;
    }
    setRegisterLoading(true);
    try {
      const user = await axiosInstance.post("/auth/register", formData);

      toast.success("Your account has been created successfully");
      setAuthPage("login");

      navigate("/auth");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      console.error("Registration Error:", errorMessage);
      toast.error(errorMessage);
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleLogOut = async () => {
    try {
      await axiosInstance.post("/auth/logout");

      // Clear frontend user state
      setAuthUser(null);
      setIsAuthenticated(false);

      // Optional: Redirect to login page
      navigate("/login");

      toast.success("You have been logged out successfully.");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  const getMentorRecommendations = async (menteeId) => {
    return await getRecommendations(menteeId);
  };

  // Dynamic filtering of content
  const [collegeFilterConfig, setCollegeFilterConfig] = useState(null);

  // Simulating an API call or loading the filter config
  useEffect(() => {
    // Fetch or set default config
    const config = {
      mentorType: true,
      industryType: true,
      specialization: true,
      university: true,
      feeRange: true,
      ratings: true,
      availability: true,
    };

    setCollegeFilterConfig(config); // Set the configuration after loading
  }, []);

  return (
    <ApiContext.Provider
      value={{
        mentors,
        mentees,
        authUser,
        registerLoading,
        loginLoading,
        isAuthenticated,
        authPage,
        setAuthPage,
        loadMentors,
        loadMentees,
        handleLogin,
        handleLogOut,
        handleRegister,
        getMentorRecommendations,
        theme,
        toggleTheme,
        collegeFilterConfig,
        setCollegeFilterConfig,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ContextProvider;
