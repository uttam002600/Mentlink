import { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../common/LoadingSpinner";
import toast from "react-hot-toast";
import { axiosInstance } from "../../utils/axios";

const BookAppointment = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await axiosInstance.get("/users/mentee/mentors");
        setMentors(response.data.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch mentors");
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const handleConnect = async (mentorId) => {
    try {
      await axios.post(`/api/mentee/connect/${mentorId}`);
      // Update UI or show success message
    } catch (err) {
      setError(err.response?.data?.message || "Connection failed");
    }
  };

  const handleRemove = async (mentorId) => {
    try {
      await axiosInstance.delete(`/users/mentee/remove/${mentorId}`);
      setMentors(mentors.filter((mentor) => mentor._id !== mentorId));
      toast.success("Mentor removed successfully from dashBoard");
    } catch (err) {
      setError(err.response?.data?.message || "Removal failed");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-[--skin-color] p-4">{error}</div>;
  if (mentors.length === 0)
    return (
      <div className="text-[--text-black-700] p-4">
        No mentors added to your dashboard
      </div>
    );

  return (
    <div className="w-full overflow-x-auto p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[--bg-black-100] text-[--text-black-900]">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left hidden sm:table-cell">Type</th>
            <th className="p-3 text-left hidden md:table-cell">Details</th>
            <th className="p-3 text-left hidden lg:table-cell">Rating</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mentors.map((mentor) => (
            <tr
              key={mentor._id}
              className="border-b border-[--bg-black-50] hover:bg-[--bg-black-50] transition-colors"
            >
              <td className="p-3 text-[--text-black-900]">
                <div className="flex items-center">
                  <img
                    src={mentor.avatar || "/default-avatar.png"}
                    alt={mentor.fullName}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  {mentor.fullName}
                </div>
              </td>
              <td className="p-3 text-[--text-black-700] hidden sm:table-cell">
                {mentor.mentorDetails?.mentorType?.replace("_", " ") || "N/A"}
              </td>
              <td className="p-3 text-[--text-black-700] hidden md:table-cell">
                {mentor.mentorDetails?.mentorType === "PROFESSOR" && (
                  <span>
                    {mentor.mentorDetails.professorDetails?.designation ||
                      "Professor"}
                  </span>
                )}
                {mentor.mentorDetails?.mentorType === "ALUMNI" && (
                  <span>
                    {mentor.mentorDetails.alumniDetails?.currentPosition ||
                      "Alumni"}
                  </span>
                )}
                {mentor.mentorDetails?.mentorType === "PEER_GROUP" && (
                  <span>
                    Year{" "}
                    {mentor.mentorDetails.peerGroupDetails?.currentYear ||
                      "Student"}
                  </span>
                )}
              </td>
              <td className="p-3 hidden lg:table-cell">
                <div className="flex items-center">
                  <span className="text-[--skin-color] mr-1">
                    {mentor.mentorDetails?.avgRating || "N/A"}
                  </span>
                  <span className="text-[--text-black-700] text-sm">
                    ({mentor.mentorDetails?.ratings?.length || 0} reviews)
                  </span>
                </div>
              </td>
              <td className="p-3">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleConnect(mentor._id)}
                    className="px-3 py-1 bg-[--skin-color] text-[--text-black-900] rounded hover:bg-opacity-90 transition"
                  >
                    Connect
                  </button>
                  <button
                    onClick={() => handleRemove(mentor._id)}
                    className="px-3 py-1 border border-[--skin-color] text-[--skin-color] rounded hover:bg-[--skin-color] hover:bg-opacity-10 transition"
                  >
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Responsive cards for mobile view */}
      <div className="mt-4 sm:hidden">
        {mentors.map((mentor) => (
          <div
            key={mentor._id}
            className="mb-4 p-3 bg-[--bg-black-100] rounded-lg"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <img
                  src={mentor.avatar || "/default-avatar.png"}
                  alt={mentor.fullName}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="text-[--text-black-900] font-medium">
                    {mentor.fullName}
                  </h3>
                  <p className="text-[--text-black-700] text-sm">
                    {mentor.mentorDetails?.mentorType?.replace("_", " ") ||
                      "N/A"}
                  </p>
                </div>
              </div>
              <div className="text-[--skin-color]">
                {mentor.mentorDetails?.avgRating || "N/A"} ★
              </div>
            </div>

            <div className="mt-3 text-[--text-black-700] text-sm">
              {mentor.mentorDetails?.mentorType === "PROFESSOR" && (
                <p>
                  {mentor.mentorDetails.professorDetails?.designation ||
                    "Professor"}
                </p>
              )}
              {mentor.mentorDetails?.mentorType === "ALUMNI" && (
                <p>
                  {mentor.mentorDetails.alumniDetails?.currentPosition ||
                    "Alumni"}
                </p>
              )}
              {mentor.mentorDetails?.mentorType === "PEER_GROUP" && (
                <p>
                  Year{" "}
                  {mentor.mentorDetails.peerGroupDetails?.currentYear ||
                    "Student"}
                </p>
              )}
            </div>

            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => handleConnect(mentor._id)}
                className="flex-1 py-1 bg-[--skin-color] text-[--text-black-900] rounded hover:bg-opacity-90 transition"
              >
                Connect
              </button>
              <button
                onClick={() => handleRemove(mentor._id)}
                className="flex-1 py-1 border border-[--skin-color] text-[--skin-color] rounded hover:bg-[--skin-color] hover:bg-opacity-10 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookAppointment;
