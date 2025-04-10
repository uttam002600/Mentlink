import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  MdManageAccounts,
  MdDashboard,
  MdSettings,
  MdPerson,
  MdLogout,
} from "react-icons/md";
import ThemeToggle from "./ThemeToggle";
import { ApiContext } from "../../Context/ContextProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, handleLogOut } = useContext(ApiContext);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleAccount = () => setAccountOpen(!accountOpen);

  // Auto-close menus on navigation or click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".account-menu") &&
        !event.target.closest(".account-button")
      ) {
        setAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    setIsOpen(false);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [location]);

  const navLinks = [
    { name: "College", path: "/" },
    { name: "Collaboration", path: "/collaboration" },
    { name: "About Us", path: "/about" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[var(--bg-black-100)] sticky top-0 shadow-lg z-50 border-b border-[var(--bg-black-50)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-[var(--skin-color)] to-purple-600 bg-clip-text text-transparent"
            >
              MENTPAT
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle className="mr-4" />
            <button
              onClick={toggleDropdown}
              className="inline-flex items-center justify-center p-2 rounded-md text-[var(--text-black-900)] hover:text-[var(--skin-color)] focus:outline-none"
              aria-expanded="false"
            >
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link, index) => (
              <Link key={index} to={link.path}>
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? "bg-[var(--skin-color)] text-white shadow-md"
                      : "text-[var(--text-black-900)] hover:bg-[var(--bg-black-50)] hover:text-[var(--skin-color)]"
                  }`}
                >
                  {link.name}
                </button>
              </Link>
            ))}
          </div>

          {/* Account/Login Section */}
          <div className="hidden md:flex md:items-center space-x-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <div className="relative account-menu">
                <button
                  onClick={toggleAccount}
                  className="account-button flex items-center space-x-1 p-2 rounded-full hover:bg-[var(--bg-black-50)] transition-colors duration-200"
                >
                  <MdManageAccounts className="h-5 w-5 text-[var(--skin-color)]" />
                  <span className="text-[var(--text-black-900)]">Account</span>
                </button>

                {accountOpen && (
                  <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden">
                    <div className="py-1">
                      <Link
                        to="/update-profile"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <MdPerson className="mr-2 text-[var(--skin-color)]" />
                        Update Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <MdDashboard className="mr-2 text-[var(--skin-color)]" />
                        Dashboard
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <MdSettings className="mr-2 text-[var(--skin-color)]" />
                        Settings
                      </Link>
                      <div className="border-t border-gray-100"></div>
                      <button
                        onClick={handleLogOut}
                        className="w-full text-left flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <MdLogout className="mr-2" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-gradient-to-r from-[var(--skin-color)] to-purple-600 text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center min-w-[120px]"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl border-t border-[var(--bg-black-50)]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link, index) => (
              <Link key={index} to={link.path}>
                <button
                  className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? "bg-[var(--skin-color)] text-white"
                      : "text-[var(--text-black-900)] hover:bg-[var(--bg-black-50)] hover:text-[var(--skin-color)]"
                  }`}
                >
                  {link.name}
                </button>
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="px-5 space-y-3">
                <Link
                  to="/update-profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-black-900)] hover:bg-[var(--bg-black-50)]"
                >
                  Update Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-black-900)] hover:bg-[var(--bg-black-50)]"
                >
                  Dashboard
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-black-900)] hover:bg-[var(--bg-black-50)]"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogOut}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="px-5">
                <Link
                  to="/auth"
                  className="w-full block text-center bg-gradient-to-r from-[var(--skin-color)] to-purple-600 text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Login / Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
