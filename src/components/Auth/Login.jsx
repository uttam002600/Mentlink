import React, { useContext, useState } from "react";
import { ApiContext } from "../../Context/ContextProvider";

const Login = ({ setAuthPage }) => {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const { handleLogin, loginLoading } = useContext(ApiContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { emailOrUsername, password } = formData;

    // Check if the input is an email using a simple regex
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrUsername);

    // Create payload based on the input type
    const payload = {
      password,
      ...(isEmail ? { email: emailOrUsername } : { username: emailOrUsername }),
    };

    handleLogin(payload);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-black-900)] p-4">
      <div className="bg-[var(--bg-black-100)] rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-[var(--text-black-900)] mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-[var(--text-black-700)] mb-2"
              htmlFor="emailOrUsername"
            >
              Email/Username
            </label>
            <input
              type="text"
              id="emailOrUsername"
              name="emailOrUsername"
              value={formData.emailOrUsername}
              onChange={handleChange}
              className="w-full p-2 border text-black font-medium border-[var(--bg-black-50)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--skin-color)]"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-[var(--text-black-700)] mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full text-black font-medium p-2 border border-[var(--bg-black-50)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--skin-color)]"
              required
            />
          </div>
          <div className="mb-4">
            <a
              href="/forgot-password"
              className="text-[var(--skin-color)] hover:underline"
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            disabled={loginLoading}
            className="w-full bg-[var(--skin-color)] text-white py-2 rounded hover:bg-opacity-80 transition duration-200 mb-4"
          >
            Login
          </button>
          <p className="text-center">
            Don't have an account?{" "}
            <a
              href="#"
              onClick={() => {
                setAuthPage("register");
              }}
              className="text-[var(--skin-color)]"
            >
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
