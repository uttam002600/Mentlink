import React, { useContext, useState, useEffect } from "react";
import { ApiContext } from "../../Context/ContextProvider";
import { axiosInstance } from "../../utils/axios";
import { toast } from "react-hot-toast";

const Register = ({ setAuthPage }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    email: "",
    college: "",
    password: "",
    confirmPassword: "",
    username: "", // New username field
    otp: "", // New OTP field
  });

  const { handleRegister, registerLoading } = useContext(ApiContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState(""); // To hold username availability status
  const [otpSent, setOtpSent] = useState(false); // To track if OTP has been sent

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Check username availability
    if (name === "username") {
      checkUsernameAvailability(value);
    }
  };

  const checkUsernameAvailability = async (username) => {
    if (!username.trim()) {
      setUsernameStatus("");
      return;
    }

    try {
      const { data } = await axiosInstance.get(`/auth/check-username`, {
        params: { username },
      });

      setUsernameStatus(data.available ? "Accepted" : "Already Exists");
    } catch (error) {
      console.error("Error checking username:", error);
      setUsernameStatus("Error");
    }
  };

  const handleGenerateOtp = async () => {
    if (!formData.email) {
      toast.error("Please enter a valid email.");
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/send-otp", {
        email: formData.email,
      });

      if (response.data.status === "success") {
        setOtpSent(true);
        toast.success("OTP sent to your email!");
      } else {
        toast.error("Failed to send OTP.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      console.error("Registration Error:", errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-black-900)] p-4">
      <div className="bg-[var(--bg-black-100)] rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-[var(--text-black-900)] mb-6 text-center">
          Register
        </h2>
        <p className="text-center mb-4">
          Already a user?{" "}
          <a
            href="#"
            onClick={() => {
              setAuthPage("login");
            }}
            className="text-[var(--skin-color)]"
          >
            Login
          </a>
        </p>
        <form onSubmit={handleSubmit}>
          {/* Fullname Field */}
          <div className="mb-4">
            <label
              className="block text-[var(--text-black-700)] mb-2"
              htmlFor="fullname"
            >
              Fullname
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border border-[var(--bg-black-50)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--skin-color)]"
              required
            />
          </div>

          {/* Username Field */}
          <div className="mb-4">
            <label
              className="block text-[var(--text-black-700)] mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-[var(--bg-black-50)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--skin-color)]"
              required
            />
            {usernameStatus && (
              <p
                className={`text-sm ${
                  usernameStatus === "Accepted"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {usernameStatus}
              </p>
            )}
          </div>

          {/* Role Field */}
          <div className="mb-4">
            <label
              className="block text-[var(--text-black-700)] mb-2"
              htmlFor="role"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border border-[var(--bg-black-50)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--skin-color)]"
              required
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="MENTOR">Mentor</option>
              <option value="MENTEE">Mentee</option>
            </select>
          </div>

          {/* Email Field */}
          <div className="mb-4 relative">
            <label
              className="block text-[var(--text-black-700)] mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-[var(--bg-black-50)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--skin-color)]"
              required
            />
            <button
              type="button"
              onClick={handleGenerateOtp}
              className="absolute right-2 top-2 bg-[var(--skin-color)] text-white py-1 px-2 rounded"
            >
              Generate OTP
            </button>
          </div>

          {/* OTP Field */}
          {otpSent && (
            <div className="mb-4">
              <label
                className="block text-[var(--text-black-700)] mb-2"
                htmlFor="otp"
              >
                OTP
              </label>
              <input
                type="number"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                className="w-full p-2 border border-[var(--bg-black-50)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--skin-color)]"
                required
              />
            </div>
          )}

          {/* College Field */}
          <div className="mb-4">
            <label
              className="block text-[var(--text-black-700)] mb-2"
              htmlFor="college"
            >
              College
            </label>
            <select
              id="college"
              name="college"
              value={formData.college}
              onChange={handleChange}
              className="w-full p-2 border border-[var(--bg-black-50)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--skin-color)]"
              required
            >
              <option value="" disabled>
                Select your college
              </option>
              <option value="college1">College 1</option>
              <option value="college2">College 2</option>
              <option value="college3">College 3</option>
            </select>
          </div>

          {/* Password Field */}
          <div className="mb-4 relative">
            <label
              className="block text-[var(--text-black-700)] mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-[var(--bg-black-50)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--skin-color)]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-[var(--skin-color)]"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6 relative">
            <label
              className="block text-[var(--text-black-700)] mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border border-[var(--bg-black-50)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--skin-color)]"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-2 text-[var(--skin-color)]"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={registerLoading}
            className="w-full bg-[var(--skin-color)] text-white py-2 rounded hover:bg-opacity-80 transition duration-200 mb-4"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
