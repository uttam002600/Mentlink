import { useState, useContext } from "react";
import { ApiContext } from "../../Context/ContextProvider";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MentorCard = ({ user }) => {
  const { role, mentorDetails } = user;
  const { authUser } = useContext(ApiContext);
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  // Connect handler
  const handleConnect = async (mentorId) => {
    try {
      if (!authUser)
        return toast.error("Login as Mentee to check availability");
      const response = await axiosInstance.post(`/connect/${mentorId}`);
      response.data.data
        ? navigate(`/mentor/${mentorId}/availability`)
        : toast.error("Mentor hasn't set availability yet");
    } catch (err) {
      toast.error(err.response?.data?.message || "Connection failed");
    }
  };

  // Add to dashboard handler
  const addMentorToDashboard = async (mentorId) => {
    try {
      if (authUser?.role !== "MENTEE")
        return toast.error("Only mentees can add mentors");
      await axiosInstance.post("/users/add-mentor", {
        mentorId,
        menteeId: authUser._id,
      });
      toast.success("Mentor added to dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add mentor");
    }
  };

  if (role !== "MENTOR" || !mentorDetails) return null;

  // Calculate average rating
  const avgRating =
    mentorDetails.ratings?.length > 0
      ? mentorDetails.ratings.reduce((sum, r) => sum + r.rating, 0) /
        mentorDetails.ratings.length
      : (Math.random() * 2 + 3).toFixed(1);

  // Get mentor details
  const mentorInfo = (() => {
    switch (mentorDetails.mentorType) {
      case "PROFESSOR":
        return {
          title: mentorDetails.professorDetails?.designation || "Professor",
          experience: `${
            mentorDetails.professorDetails?.yearsOfExperience || "N/A"
          } years experience`,
          expertise:
            mentorDetails.professorDetails?.domainExpertise?.join(", ") ||
            "General",
          icon: "🎓",
        };
      case "ALUMNI":
        return {
          title: `${
            mentorDetails.alumniDetails?.currentPosition || "Alumni"
          } at ${mentorDetails.alumniDetails?.currentCompany || "N/A"}`,
          experience: `Batch of ${
            mentorDetails.alumniDetails?.batchPassout || "N/A"
          }`,
          expertise:
            mentorDetails.alumniDetails?.domainExpertise?.join(", ") ||
            "General",
          icon: "👔",
        };
      case "PEER_GROUP":
        return {
          title: `Year ${
            mentorDetails.peerGroupDetails?.currentYear || "N/A"
          } Student`,
          experience: `${
            mentorDetails.peerGroupDetails?.projects?.length || 0
          } projects`,
          expertise:
            mentorDetails.peerGroupDetails?.achievements?.join(", ") ||
            "Active Learner",
          icon: "👥",
        };
      default:
        return {
          title: "Mentor",
          experience: "Experienced Guide",
          expertise: "Multiple Domains",
          icon: "🌟",
        };
    }
  })();

  return (
    <div
      className="w-full h-full min-h-[400px] perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative w-full h-full transition-all duration-500 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Side */}
        <div className="absolute w-full h-full backface-hidden bg-[--bg-black-100] rounded-lg shadow-lg p-4 flex flex-col border border-[--bg-black-50] overflow-hidden">
          <div className="flex flex-col items-center text-center flex-grow">
            <div className="relative mb-4">
              <img
                src={user.avatar || "/default-avatar.png"}
                alt={user.fullName}
                className="w-20 h-20 rounded-full object-cover border-4 border-[--bg-black-50] shadow-md mx-auto"
              />
              <span className="absolute bottom-0 right-2 text-lg bg-[--bg-black-900] text-white rounded-full w-7 h-7 flex items-center justify-center">
                {mentorInfo.icon}
              </span>
            </div>

            <h3 className="text-lg font-bold text-[--text-black-900] mb-1 line-clamp-1">
              {user.fullName}
            </h3>

            <p className="text-xs text-[--text-black-700] font-medium mb-2">
              {mentorDetails.mentorType.replace("_", " ")}
            </p>

            <p className="text-xs text-[--text-black-700] bg-[--bg-black-50] px-2 py-1 rounded-full mb-3 line-clamp-1">
              {user.college || "College not specified"}
            </p>

            <div className="flex items-center justify-center mb-3">
              <div className="flex mr-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < Math.floor(avgRating)
                        ? "text-yellow-400"
                        : "text-gray-400"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-[--text-black-700]">
                {avgRating} ({mentorDetails.ratings?.length || 0})
              </span>
            </div>

            <div className="text-center mb-3">
              <p className="text-sm font-medium text-[--text-black-900] mb-1 line-clamp-1">
                {mentorInfo.title}
              </p>
              <p className="text-xs text-[--text-black-700] line-clamp-1">
                {mentorInfo.experience}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-1 mb-3">
              {mentorInfo.expertise
                .split(", ")
                .slice(0, 3)
                .map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-[--bg-black-50] text-[--text-black-900] text-xs font-medium rounded-full line-clamp-1"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </div>

          <div className="animate-pulse text-xs text-[--skin-color] font-medium text-center mt-auto pt-2">
            Click to connect
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full backface-hidden bg-[--bg-black-100] rounded-lg shadow-lg p-4 flex flex-col justify-center border border-[--bg-black-50] rotate-y-180 overflow-hidden">
          <h3 className="text-sm font-bold text-[--text-black-900] mb-4 text-center line-clamp-1">
            Connect with {user.fullName.split(" ")[0]}
          </h3>

          <div className="space-y-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleConnect(user._id);
              }}
              className="w-full py-2 text-sm bg-[--skin-color] text-white rounded font-medium hover:bg-opacity-90 transition-all"
            >
              Schedule Session
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                addMentorToDashboard(user._id);
              }}
              className="w-full py-2 text-sm border border-[--skin-color] text-[--skin-color] rounded font-medium hover:bg-purple-500 hover:text-white transition-all"
            >
              Add to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
