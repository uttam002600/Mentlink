import { useContext } from "react";

const MentorCard = ({ user }) => {
  const { role, mentorDetails } = user;

  // Don't render if not a mentor or missing required data
  if (role !== "MENTOR" || !mentorDetails) return null;

  // Calculate average rating (dummy if none)
  const avgRating =
    mentorDetails.ratings?.length > 0
      ? mentorDetails.ratings.reduce((sum, r) => sum + r.rating, 0) /
        mentorDetails.ratings.length
      : (Math.random() * 2 + 3).toFixed(1); // Random between 3.0-5.0

  // Get mentor type specific details
  const getMentorSpecificDetails = () => {
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
  };

  const mentorInfo = getMentorSpecificDetails();

  return (
    <div className="flex flex-col bg-[--bg-color-50] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-[--skin-color] border-opacity-20">
      {/* Header Section */}
      <div className="flex items-start p-4 bg-[--skin-color] bg-opacity-10">
        <div className="relative mr-4">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt={user.fullName}
            className="w-16 h-16 rounded-full object-cover border-2 border-[--skin-color]"
          />
          <span className="absolute -bottom-1 -right-1 text-xs bg-white rounded-full p-1 border border-[--skin-color]">
            {mentorInfo.icon}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <h3 className="font-bold text-[--text-black-900] text-lg">
              {user.fullName}
            </h3>
            <span className="text-xs text-[--text-balck-700] font-bold">
              ({mentorDetails.mentorType.replace("_", " ")})
            </span>
          </div>
          <p className="text-sm font-medium text-[--text-balck-700] mt-1 bg-[--skin-color] bg-opacity-10 px-2 py-1 rounded-md inline-block">
            {user.college || "College not specified"}
          </p>
          <p className="text-xs text-[--text-black-700] font-bold mt-2">
            {mentorInfo.title}
          </p>
        </div>
      </div>

      {/* Body Section */}
      <div className="p-4 flex-1">
        <div className="flex items-center mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-lg ${
                  i < Math.floor(avgRating)
                    ? "text-[--skin-color]"
                    : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="ml-2 text-sm text-[--text-black-700]">
            {avgRating} ({mentorDetails.ratings?.length || 0} reviews)
          </span>
        </div>

        <div className="space-y-2 text-sm">
          <p className="text-[--text-black-700]">{mentorInfo.experience}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {mentorInfo.expertise
              .split(", ")
              .slice(0, 3)
              .map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-[--skin-color] bg-opacity-10 text-[--text-balck-700] text-bold rounded-full"
                >
                  {skill}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex border-t border-[--skin-color] border-opacity-20 p-3">
        <button className="flex-1 bg-[--skin-color] text-white py-2 rounded-lg mr-2 hover:bg-opacity-90 transition">
          Connect
        </button>
        <button className="flex-1 border border-[--skin-color] text-[--skin-color] py-2 rounded-lg hover:bg-[--skin-color] hover:bg-opacity-10 transition">
          Add to Dashboard
        </button>
      </div>
    </div>
  );
};

export default MentorCard;
