import { useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../utils/axios.js";
import { ApiContext } from "../Context/ContextProvider";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Camera, Mail, User } from "lucide-react";

const UpdateProfile = () => {
  const { authUser: user, isAuthenticated } = useContext(ApiContext);

  if (!isAuthenticated || !user) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  // Helper function to safely get array fields
  const getSafeArray = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === "string")
      return value.split(",").map((item) => item.trim());
    return [];
  };

  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    college: user.college || "",
    domainOfInterest:
      user.role === "MENTEE" ? getSafeArray(user.domainOfInterest) : [],
    learningGoals:
      user.role === "MENTEE" ? getSafeArray(user.learningGoals) || "" : "",
    expertiseDomains:
      user.role === "MENTOR" ? getSafeArray(user.expertiseDomains) : [],
    mentorshipCategories:
      user.role === "MENTOR" ? getSafeArray(user.mentorshipCategories) : [],
    mentorType: user.role === "MENTOR" ? user.mentorType || "" : "",
    mentorDetails: {
      professorDetails: {
        yearsOfExperience:
          user.mentorDetails?.professorDetails?.yearsOfExperience || "",
        domainExpertise: getSafeArray(
          user.mentorDetails?.professorDetails?.domainExpertise
        ),
        researchPublications: getSafeArray(
          user.mentorDetails?.professorDetails?.researchPublications
        ),
        designation: user.mentorDetails?.professorDetails?.designation || "",
      },
      alumniDetails: {
        batchPassout: user.mentorDetails?.alumniDetails?.batchPassout || "",
        domainExpertise: getSafeArray(
          user.mentorDetails?.alumniDetails?.domainExpertise
        ),
        companiesWorkedAt: getSafeArray(
          user.mentorDetails?.alumniDetails?.companiesWorkedAt
        ),
        currentCompany: user.mentorDetails?.alumniDetails?.currentCompany || "",
        currentPosition:
          user.mentorDetails?.alumniDetails?.currentPosition || "",
      },
      peerGroupDetails: {
        currentYear: user.mentorDetails?.peerGroupDetails?.currentYear || "",
        projects: getSafeArray(user.mentorDetails?.peerGroupDetails?.projects),
        achievements: getSafeArray(
          user.mentorDetails?.peerGroupDetails?.achievements
        ),
      },
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested mentor details
    if (name.startsWith("mentorDetails.")) {
      const path = name.split(".");
      setFormData((prev) => ({
        ...prev,
        mentorDetails: {
          ...prev.mentorDetails,
          [path[1]]: {
            ...prev.mentorDetails[path[1]],
            [path[2]]:
              path[2].endsWith("Expertise") ||
              path[2] === "researchPublications" ||
              path[2] === "companiesWorkedAt" ||
              path[2] === "projects" ||
              path[2] === "achievements"
                ? value.split(",").map((item) => item.trim())
                : value,
          },
        },
      }));
      return;
    }

    // Handle array fields
    if (
      name === "mentorshipCategories" ||
      name === "expertiseDomains" ||
      name === "domainOfInterest" ||
      name === "learningGoals"
    ) {
      setFormData((prev) => ({
        ...prev,
        [name]: value.split(",").map((item) => item.trim()),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUpdatingProfile(true);
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await axiosInstance.patch("/auth/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSelectedImg(URL.createObjectURL(file));
      toast.success("Avatar updated successfully!");
    } catch (error) {
      toast.error("Failed to update avatar.");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let payload = {
        fullName: formData.fullName,
        college: formData.college,
      };

      if (user.role === "MENTEE") {
        if (formData.domainOfInterest?.length) {
          payload.domainOfInterest = formData.domainOfInterest;
        }

        if (formData.learningGoals) {
          payload["menteeDetails.learningGoals"] = formData.learningGoals;
        }
      }

      if (user.role === "MENTOR") {
        if (formData.expertiseDomains?.length) {
          payload.expertiseDomains = formData.expertiseDomains;
        }

        if (formData.mentorshipCategories?.length) {
          payload.mentorshipCategories = formData.mentorshipCategories;
        }

        if (formData.mentorType) {
          payload.mentorType = formData.mentorType;
        }

        // Add mentor type specific details
        if (formData.mentorType === "PROFESSOR") {
          const prof = formData.mentorDetails.professorDetails;
          payload.yearsOfExperience = prof.yearsOfExperience;
          payload.domainExpertise = prof.domainExpertise;
          payload.researchPublications = prof.researchPublications;
          payload.designation = prof.designation;
        }

        if (formData.mentorType === "ALUMNI") {
          const alumni = formData.mentorDetails.alumniDetails;
          payload.batchPassout = alumni.batchPassout;
          payload.domainExpertise = alumni.domainExpertise;
          payload.companiesWorkedAt = alumni.companiesWorkedAt;
          payload.currentCompany = alumni.currentCompany;
          payload.currentPosition = alumni.currentPosition;
        }

        if (formData.mentorType === "PEER_GROUP") {
          const peer = formData.mentorDetails.peerGroupDetails;
          payload.currentYear = peer.currentYear;
          payload.projects = peer.projects;
          payload.achievements = peer.achievements;
        }
      }

      await axiosInstance.patch("/users/update-account-details", payload);

      toast.success("Profile updated successfully!");
      // Consider using a state update instead of reload if possible
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    }
  };

  const getArrayDisplayValue = (value) => {
    if (!value) return "";
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "string") return value;
    return "";
  };

  const [selectedImg, setSelectedImg] = useState(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center bg-[--bg-black-900] p-4">
      <div className="max-w-lg w-full bg-[--bg-black-100] p-6 rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-semibold text-[--text-black-900] mb-4">
          Update Profile
        </h2>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="relative">
            <img
              src={selectedImg || user.avatar || "/assets/common/avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-[--skin-color]"
            />
            <label
              htmlFor="avatar-upload"
              className={`
                absolute bottom-0 right-0 
                bg-base-content hover:scale-105
                p-2 rounded-full cursor-pointer 
                transition-all duration-200
                ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
              `}
            >
              <Camera className="w-5 h-5 text-base-200" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-sm text-zinc-400">
            {isUpdatingProfile
              ? "Uploading..."
              : "Click the camera icon to update your photo"}
          </p>
        </div>

        {/* Profile Update Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="p-3 border rounded-lg bg-[--bg-black-50] text-[--text-black-900] w-full"
          />
          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="College"
            className="p-3 border rounded-lg bg-[--bg-black-50] text-[--text-black-900] w-full"
          />

          {/* Role-Specific Fields */}
          {user.role === "MENTEE" && (
            <>
              <input
                type="text"
                name="domainOfInterest"
                value={formData.domainOfInterest.join(", ")}
                onChange={handleChange}
                placeholder="Domain of Interest (comma separated)"
                className="p-3 border rounded-lg bg-[--bg-black-50] text-[--text-black-900] w-full"
              />
              <input
                type="text"
                name="learningGoals"
                value={formData.learningGoals.join(", ")}
                onChange={handleChange}
                placeholder="Learning Goals"
                className="p-3 border rounded-lg bg-[--bg-black-50] text-[--text-black-900] w-full"
              />
            </>
          )}
          {user.role === "MENTOR" && (
            <>
              <select
                name="mentorType"
                value={formData.mentorType}
                onChange={handleChange}
                className="p-3 border rounded-lg bg-[--bg-black-50] text-[--text-black-900] w-full"
              >
                <option value="">Select Mentor Type</option>
                <option value="PROFESSOR">Professor</option>
                <option value="ALUMNI">Alumni</option>
                <option value="PEER_GROUP">Peer Group</option>
              </select>

              {/* Mentor Details based on Mentor Type */}
              {formData.mentorType === "PROFESSOR" && (
                <div className="space-y-4">
                  <input
                    type="number"
                    name="mentorDetails.professorDetails.yearsOfExperience"
                    value={
                      formData.mentorDetails.professorDetails.yearsOfExperience
                    }
                    onChange={handleChange}
                    placeholder="Years of Experience"
                    className="p-3 border rounded-lg bg-[--bg-black-50] text-[--text-black-900] w-full"
                  />
                  <input
                    type="text"
                    name="mentorDetails.professorDetails.domainExpertise"
                    value={formData.mentorDetails.professorDetails.domainExpertise.join(
                      ", "
                    )}
                    onChange={handleChange}
                    placeholder="Domain Expertise (comma separated)"
                    className="p-3 border rounded-lg bg-[--bg-black-50] text-[--text-black-900] w-full"
                  />
                  <input
                    type="text"
                    name="mentorDetails.professorDetails.researchPublications"
                    value={formData.mentorDetails.professorDetails.researchPublications.join(
                      ", "
                    )}
                    onChange={handleChange}
                    placeholder="Research Publications (comma separated)"
                    className="p-3 border rounded-lg bg-[--bg-black-50] text-[--text-black-900] w-full"
                  />
                  <input
                    type="text"
                    name="mentorDetails.professorDetails.designation"
                    value={formData.mentorDetails.professorDetails.designation}
                    onChange={handleChange}
                    placeholder="Designation"
                    className="p-3 border rounded-lg bg-[--bg-black-50] text-[--text-black-900] w-full"
                  />
                </div>
              )}

              {formData.mentorType === "ALUMNI" && (
                <div className="space-y-4">
                  <input
                    type="number"
                    name="mentorDetails.alumniDetails.batchPassout"
                    value={formData.mentorDetails.alumniDetails.batchPassout}
                    onChange={handleChange}
                    placeholder="Batch Passout Year"
                    className="p-3 border rounded-lg bg-[--bg-black-50] text-[--text-black-900] w-full"
                  />
                  <input
                    type="text"
                    name="mentorDetails.alumniDetails.domainExpertise"
                    value={formData.mentorDetails.alumniDetails.domainExpertise.join(
                      ", "
                    )}
                    onChange={handleChange}
                    placeholder="Domain Expertise (comma separated)"
                    className="p-3 border rounded-lg bg-[--bg-black-50] text-[--text-black-900] w-full"
                  />
                  <input
                    type="text"
                    name="mentorDetails.alumniDetails.companiesWorkedAt"
                    value={formData.mentorDetails.alumniDetails.companiesWorkedAt.join(
                      ", "
                    )}
                    onChange={handleChange}
                    placeholder="Companies Worked At (comma separated)"
                    className="p-3 border rounded-lg bg-[--bg-black-50] text-[--text-black-900] w-full"
                  />
                  <input
                    type="text"
                    name="mentorDetails.alumniDetails.currentCompany"
                    value={formData.mentorDetails.alumniDetails.currentCompany}
                    onChange={handleChange}
                    placeholder="Current Company"
                    className="p-3 border rounded-lg bg-[--bg-black-50] text-[--text-black-900] w-full"
                  />
                  <input
                    type="text"
                    name="mentorDetails.alumniDetails.currentPosition"
                    value={formData.mentorDetails.alumniDetails.currentPosition}
                    onChange={handleChange}
                    placeholder="Current Position"
                    className="p-3 border rounded-lg bg-[--bg-black-50] text-[--text-black-900] w-full"
                  />
                </div>
              )}

              {formData.mentorType === "PEER_GROUP" && (
                <div className="space-y-4">
                  <input
                    type="number"
                    name="mentorDetails.peerGroupDetails.currentYear"
                    value={formData.mentorDetails.peerGroupDetails.currentYear}
                    onChange={handleChange}
                    placeholder="Current Year"
                    className="p-3 border rounded-lg bg-[--bg-black-50] text-[--text-black-900] w-full"
                  />
                  <input
                    type="text"
                    name="mentorDetails.peerGroupDetails.projects"
                    value={getArrayDisplayValue(
                      formData.mentorDetails.peerGroupDetails.projects
                    )}
                    onChange={handleChange}
                    placeholder="Projects (comma separated)"
                    className="p-3 border rounded-lg bg-[--bg-black-50] text-[--text-black-900] w-full"
                  />
                  <input
                    type="text"
                    name="mentorDetails.peerGroupDetails.achievements"
                    value={getArrayDisplayValue(
                      formData.mentorDetails.peerGroupDetails.achievements
                    )}
                    onChange={handleChange}
                    placeholder="Achievements (comma separated)"
                    className="p-3 border rounded-lg bg-[--bg-black-50] text-[--text-black-900] w-full"
                  />
                </div>
              )}

              <input
                type="text"
                name="expertiseDomains"
                value={formData.expertiseDomains.join(", ")}
                onChange={handleChange}
                placeholder="Expertise Domains (comma separated)"
                className="p-3 border rounded-lg bg-[--bg-black-50] text-[--text-black-900] w-full"
              />
              <input
                type="text"
                name="mentorshipCategories"
                value={formData.mentorshipCategories.join(", ")}
                onChange={handleChange}
                placeholder="Mentorship Categories (comma separated)"
                className="p-3 border rounded-lg bg-[--bg-black-50] text-[--text-black-900] w-full"
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-[--skin-color] text-white py-3 rounded-lg"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
