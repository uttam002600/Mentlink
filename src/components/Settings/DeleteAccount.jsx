import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { toast } from "react-hot-toast";
import { axiosInstance } from "../../utils/axios";

const DeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (
      !window.confirm(
        "Are you absolutely sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.delete("/auth/delete-account", {
        data: { password: data.password },
      });
      toast.success(response.data.message || "Account deleted successfully");
      // You might want to redirect or log out the user here
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4">
      <div className="w-full max-w-md bg-[--bg-black-50] rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-[--text-black-900]">
          Delete Account
        </h2>

        <div className="bg-[--bg-black-100] border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-400">
            Warning: Deleting your account is permanent and cannot be undone.
            All your data will be removed immediately.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-2 text-[--text-black-700]">
              Enter your password to confirm
            </label>
            <input
              type="password"
              className={`w-full p-3 rounded bg-[--bg-black-100] text-[--text-black-900] border ${
                errors.password ? "border-red-500" : "border-[--bg-black-100]"
              }`}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required to confirm account deletion",
              })}
            />
            {errors.password && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-[--text-black-900] px-4 py-3 rounded font-medium hover:opacity-90 transition-opacity disabled:opacity-70"
          >
            {loading ? "Deleting..." : "Permanently Delete Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccount;
