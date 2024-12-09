import React, { useState } from "react";

const Login = ({ setAuthPage }) => {
  const [role, setRole] = useState("mentee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ role, email, password, adminCode });
  };

  return (
    <div className="bg-[var(--bg-black-100)] flex items-center justify-center min-h-screen z-0">
      <div className="bg-[var(--bg-black-50)] rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-[var(--text-black-900)] text-2xl font-bold text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-[var(--text-black-700)] mb-2"
            >
              Select Role
            </label>
            <select
              id="role"
              value={role}
              onChange={handleRoleChange}
              className="border border-[var(--text-black-700)] rounded-md p-2 w-full text-black"
            >
              <option value="mentee">Mentee (Student/User)</option>
              <option value="mentor">Mentor (Professor)</option>
              <option value="global-mentor">Mentor (Global)</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-[var(--text-black-700)] mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[var(--text-black-700)] rounded-md p-2 w-full"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-[var(--text-black-700)] mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-[var(--text-black-700)] rounded-md p-2 w-full"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-black"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {role === "admin" && (
            <div className="mb-4">
              <label
                htmlFor="admin-code"
                className="block text-[var(--text-black-700)] mb-2"
              >
                Admin Security Code
              </label>
              <input
                type="text"
                id="admin-code"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                className="border border-[var(--text-black-700)] rounded-md p-2 w-full"
                placeholder="Enter your security code"
              />
            </div>
          )}

          <div className="mb-4">
            <a href="#" className="text-[var(--skin-color)] hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="bg-[var(--skin-color)] text-white rounded-md p-2 w-full hover:bg-purple-600 transition duration-200"
          >
            {role === "admin"
              ? "Login as Admin"
              : role === "mentor"
              ? "Login as Mentor"
              : "Login as Mentee"}
          </button>

          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-2">
              <button className="bg-[var(--skin-color)] text-white rounded-md p-2 hover:bg-purple-600 transition duration-200">
                Login with Google
              </button>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-[var(--text-black-700)]">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-[var(--skin-color)] hover:underline"
                onClick={() => {
                  setAuthPage("register");
                }}
              >
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
