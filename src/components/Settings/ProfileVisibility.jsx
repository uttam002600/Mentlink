import React, { useState } from "react";

import { toast } from "react-hot-toast";
import { axiosInstance } from "../../utils/axios";

const ProfileVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVisibilityChange = async () => {
    if (!isConfirmed) {
      toast.error("Please confirm the change by checking the box");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.patch("/auth/profile-visibility", {
        isVisible: !isVisible,
      });
      setIsVisible(!isVisible);
      setIsConfirmed(false);
      toast.success(response.data.message || "Visibility updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update visibility");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4">
      <div className="w-full max-w-md bg-[--bg-black-50] rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-[--text-black-900]">
          Profile Visibility
        </h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-[--bg-black-100] rounded-lg">
            <span className="text-[--text-black-700]">
              Make my profile public
            </span>
            <button
              onClick={() => setIsVisible(!isVisible)}
              disabled={loading}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isVisible ? "bg-[--skin-color]" : "bg-[--bg-black-900]"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  isVisible ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <p className="text-sm text-[--text-black-700]">
            {isVisible
              ? "Your profile is currently visible to others."
              : "Your profile is currently hidden from others."}
          </p>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="confirmation"
                type="checkbox"
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
                className="w-4 h-4 rounded bg-[--bg-black-100] border-[--bg-black-900] focus:ring-[--skin-color]"
              />
            </div>
            <label
              htmlFor="confirmation"
              className="ml-2 text-sm text-[--text-black-700]"
            >
              I understand this will change who can see my profile
            </label>
          </div>

          <button
            onClick={handleVisibilityChange}
            disabled={loading || !isConfirmed}
            className="w-full bg-[--skin-color] text-[--text-black-900] px-4 py-3 rounded font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileVisibility;
