import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { toast } from "react-hot-toast";
import { axiosInstance } from "../../utils/axios";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/change-password", {
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success(response.data.message || "Password changed successfully");
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4">
      <div className="w-full max-w-md bg-[--bg-black-50] rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-[--text-black-900]">
          Change Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-2 text-[--text-black-700]">
              Current Password
            </label>
            <input
              type="password"
              className={`w-full p-3 rounded bg-[--bg-black-100] text-[--text-black-900] border ${
                errors.currentPassword
                  ? "border-red-500"
                  : "border-[--bg-black-100]"
              }`}
              placeholder="Enter current password"
              {...register("currentPassword", {
                required: "Current password is required",
              })}
            />
            {errors.currentPassword && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-[--text-black-700]">
              New Password
            </label>
            <input
              type="password"
              className={`w-full p-3 rounded bg-[--bg-black-100] text-[--text-black-900] border ${
                errors.newPassword
                  ? "border-red-500"
                  : "border-[--bg-black-100]"
              }`}
              placeholder="Enter new password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters",
                },
              })}
            />
            {errors.newPassword && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-[--text-black-700]">
              Confirm New Password
            </label>
            <input
              type="password"
              className={`w-full p-3 rounded bg-[--bg-black-100] text-[--text-black-900] border ${
                errors.confirmPassword
                  ? "border-red-500"
                  : "border-[--bg-black-100]"
              }`}
              placeholder="Confirm new password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === newPassword || "Passwords don't match",
              })}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[--skin-color] text-[--text-black-900] px-4 py-3 rounded font-medium hover:opacity-90 transition-opacity disabled:opacity-70"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
