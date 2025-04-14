import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios.js";
import { toast } from "react-hot-toast";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [mentors, setMentors] = useState([]);
  const [mentorsLoading, setMentorsLoading] = useState(false);

  const fetchAllMentors = async () => {
    try {
      setMentorsLoading(true);
      const response = await axiosInstance.get("/users/");
      setMentors(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch mentors");
      console.error("Mentor fetch error:", error);
    } finally {
      setMentorsLoading(false);
    }
  };

  // Fetch mentors on initial load
  useEffect(() => {
    fetchAllMentors();
  }, []);

  const value = {
    mentors,
    mentorsLoading,
    fetchAllMentors, // Expose if you want to manually refresh
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
