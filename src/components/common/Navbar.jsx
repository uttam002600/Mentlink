import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MdManageAccounts } from "react-icons/md";
import ThemeToggle from "./ThemeToggle";
import { ApiContext } from "../../Context/ContextProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get the current location
  const { isAuthenticated, handleLogOut } = useContext(ApiContext);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Auto-close the mobile menu on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Define the simplified nav links
  const navLinks = [
    { name: "College", path: "/" },
    { name: "Collaboration", path: "/collaboration" },
    { name: "About Us", path: "/about" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-[var(--bg-black-100)] sticky top-0 shadow-md z-10">
      <div className="flex justify-between items-center p-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-[var(--skin-color)] font-bold text-xl cursor-pointer"
        >
          MENTPAT
        </Link>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button onClick={toggleDropdown}>
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          {navLinks.map((link, index) => (
            <Link key={index} to={link.path}>
              <button
                className={`text-[var(--text-black-900)] hover:text-[var(--skin-color)] ${
                  isActive(link.path) ? "text-[var(--skin-color)]" : ""
                }`}
              >
                {link.name}
              </button>
            </Link>
          ))}
        </div>

        {/* Account/Login Section */}
        <div className="flex justify-center items-center">
          <ThemeToggle />
          <div className="ml-2">
            {isAuthenticated ? (
              <div className="relative group">
                <button className="text-[var(--text-black-900)] hover:text-[var(--skin-color)] flex items-center gap-2 justify-center">
                  <MdManageAccounts />
                  <span>Account</span>
                </button>
                <div className="absolute right-0 hidden group-hover:block bg-white shadow-lg rounded-md mt-0 min-w-[180px] border border-gray-200 z-20">
                  <Link
                    to="/update-profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Update Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 transition-colors"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-[var(--skin-color)] text-white px-4 py-2 rounded-md hover:bg-purple-600 flex items-center justify-center min-w-[80px] min-h-[40px]"
              >
                <span className="block lg:hidden">SignUp</span>
                <span className="hidden lg:block">Login / Register</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          {navLinks.map((link, index) => (
            <Link key={index} to={link.path}>
              <button className="block w-full text-left px-4 py-2 text-black hover:text-[var(--skin-color)]">
                {link.name}
              </button>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
