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

  // for consistent user state after reloading
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axiosInstance.get("/users/getUser");

        if (response.status === 200) {
          setIsAuthenticated(true);
          setAuthUser(response.data.data);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setAuthUser(null);
      }
    };

    fetchCurrentUser();
  }, []);

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
      navigate("/");

      toast.success("You have been logged out successfully.");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  const getMentorRecommendations = async (menteeId) => {
    return await getRecommendations(menteeId);
  };

  // Filter function updated for your schema
  const filterMentors = (mentors, filters) => {
    return mentors.filter((mentor) => {
      // Only filter mentor users
      if (mentor.role !== "MENTOR") return false;

      // Search filter - searches name, username, and expertiseDomains
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const name = mentor.fullName?.toLowerCase() || "";
        const username = mentor.username?.toLowerCase() || "";
        const expertiseDomains = mentor.expertiseDomains || [];

        if (
          !name.includes(query) &&
          !username.includes(query) &&
          !expertiseDomains.some((domain) =>
            domain?.toLowerCase().includes(query)
          )
        ) {
          return false;
        }
      }

      // Mentor Type filter
      if (
        filters.mentorType &&
        mentor.mentorDetails?.mentorType !== filters.mentorType.toUpperCase()
      ) {
        return false;
      }

      // Mentorship Categories filter (multiple select)
      if (filters.categories && filters.categories.length > 0) {
        const mentorCategories = mentor.mentorshipCategories || [];
        if (
          !filters.categories.some((category) =>
            mentorCategories.includes(category)
          )
        ) {
          return false;
        }
      }

      // College filter
      if (filters.college && mentor.college !== filters.college) {
        return false;
      }

      // Expertise Domains filter (multiple select)
      if (filters.expertise && filters.expertise.length > 0) {
        const mentorExpertise = mentor.expertiseDomains || [];
        if (!filters.expertise.some((exp) => mentorExpertise.includes(exp))) {
          return false;
        }
      }

      // Professor-specific filters
      if (filters.yearsOfExperience && mentor.mentorDetails?.professorDetails) {
        if (
          mentor.mentorDetails.professorDetails.yearsOfExperience <
          filters.yearsOfExperience
        ) {
          return false;
        }
      }

      // Alumni-specific filters
      if (filters.batchPassout && mentor.mentorDetails?.alumniDetails) {
        if (
          mentor.mentorDetails.alumniDetails.batchPassout > filters.batchPassout
        ) {
          return false;
        }
      }

      // Peer Group-specific filters
      if (filters.currentYear && mentor.mentorDetails?.peerGroupDetails) {
        if (
          mentor.mentorDetails.peerGroupDetails.currentYear !==
          filters.currentYear
        ) {
          return false;
        }
      }

      // Average Rating filter (calculated from ratings array)
      if (filters.minRating) {
        const ratings = mentor.mentorDetails?.ratings || [];
        const averageRating =
          ratings.length > 0
            ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
            : 0;
        if (averageRating < parseFloat(filters.minRating)) {
          return false;
        }
      }

      return true;
    });
  };

  // Updated sorting function for your schema
  const sortMentors = (mentors, sortBy) => {
    if (!sortBy) return mentors;

    const sorted = [...mentors];
    switch (sortBy) {
      case "rating-desc":
        return sorted.sort((a, b) => {
          const aRatings = a.mentorDetails?.ratings || [];
          const bRatings = b.mentorDetails?.ratings || [];
          const aAvg = aRatings.length
            ? aRatings.reduce((sum, r) => sum + r.rating, 0) / aRatings.length
            : 0;
          const bAvg = bRatings.length
            ? bRatings.reduce((sum, r) => sum + r.rating, 0) / bRatings.length
            : 0;
          return bAvg - aAvg;
        });
      case "rating-asc":
        return sorted.sort((a, b) => {
          const aRatings = a.mentorDetails?.ratings || [];
          const bRatings = b.mentorDetails?.ratings || [];
          const aAvg = aRatings.length
            ? aRatings.reduce((sum, r) => sum + r.rating, 0) / aRatings.length
            : 0;
          const bAvg = bRatings.length
            ? bRatings.reduce((sum, r) => sum + r.rating, 0) / bRatings.length
            : 0;
          return aAvg - bAvg;
        });
      case "experience-desc":
        return sorted.sort((a, b) => {
          const aExp =
            a.mentorDetails?.professorDetails?.yearsOfExperience || 0;
          const bExp =
            b.mentorDetails?.professorDetails?.yearsOfExperience || 0;
          return bExp - aExp;
        });
      case "experience-asc":
        return sorted.sort((a, b) => {
          const aExp =
            a.mentorDetails?.professorDetails?.yearsOfExperience || 0;
          const bExp =
            b.mentorDetails?.professorDetails?.yearsOfExperience || 0;
          return aExp - bExp;
        });
      default:
        return mentors;
    }
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
        filterMentors,
        sortMentors,
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
