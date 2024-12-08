import React, { createContext, useEffect, useState } from "react";
// import {
//   fetchMentors,
//   fetchMentees,
//   login,
//   register,
//   getRecommendations,
// } from "../services/api";

export const ApiContext = createContext();

const ContextProvider = ({ children }) => {
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

  // Methods for fetching data
  const loadMentors = async () => {
    const data = await fetchMentors();
    setMentors(data);
  };

  const loadMentees = async () => {
    const data = await fetchMentees();
    setMentees(data);
  };

  const handleLogin = async (credentials) => {
    const user = await login(credentials);
    setAuthUser(user);
  };

  const handleRegister = async (details) => {
    const user = await register(details);
    setAuthUser(user);
  };

  const getMentorRecommendations = async (menteeId) => {
    return await getRecommendations(menteeId);
  };

  return (
    <ApiContext.Provider
      value={{
        mentors,
        mentees,
        authUser,
        loadMentors,
        loadMentees,
        handleLogin,
        handleRegister,
        getMentorRecommendations,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ContextProvider;
