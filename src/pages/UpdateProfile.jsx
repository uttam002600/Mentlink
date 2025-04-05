import { useState } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../utils/axios";

const UpdateProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    username: user.username || "",
    college: user.college || "",
    domainOfInterest: user.role === "MENTEE" ? user.domainOfInterest || "" : "",
    learningGoals: user.role === "MENTEE" ? user.learningGoals || "" : "",
    expertiseDomains: user.role === "MENTOR" ? user.expertiseDomains || "" : "",
    mentorshipCategories:
      user.role === "MENTOR" ? user.mentorshipCategories || "" : "",
  });
  const [avatar, setAvatar] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await axiosInstance.post("/user/avatar-change", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Avatar updated successfully!");
    } catch (error) {
      toast.error("Failed to update avatar.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put("/user/update-profile", formData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Error updating profile.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[--bg-black-900] p-4">
      <div className="max-w-lg w-full bg-[--bg-black-100] p-6 rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-semibold text-[--text-black-900] mb-4">
          Update Profile
        </h2>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-[--skin-color] mb-2"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
            id="avatarUpload"
          />
          <label
            htmlFor="avatarUpload"
            className="px-4 py-2 bg-[--skin-color] text-white rounded-lg cursor-pointer"
          >
            Change Avatar
          </label>
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
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
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
                value={formData.domainOfInterest}
                onChange={handleChange}
                placeholder="Domain of Interest"
                className="p-3 border rounded-lg bg-[--bg-black-50] text-[--text-black-900] w-full"
              />
              <input
                type="text"
                name="learningGoals"
                value={formData.learningGoals}
                onChange={handleChange}
                placeholder="Learning Goals"
                className="p-3 border rounded-lg bg-[--bg-black-50] text-[--text-black-900] w-full"
              />
            </>
          )}
          {user.role === "MENTOR" && (
            <>
              <input
                type="text"
                name="expertiseDomains"
                value={formData.expertiseDomains}
                onChange={handleChange}
                placeholder="Expertise Domains"
                className="p-3 border rounded-lg bg-[--bg-black-50] text-[--text-black-900] w-full"
              />
              <input
                type="text"
                name="mentorshipCategories"
                value={formData.mentorshipCategories}
                onChange={handleChange}
                placeholder="Mentorship Categories"
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
