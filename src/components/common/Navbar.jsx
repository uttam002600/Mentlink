import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MdManageAccounts } from "react-icons/md";
import ThemeToggle from "./ThemeToggle";
import { ApiContext } from "../../Context/ContextProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation(); // Get the current location

  const { isAuthenticated } = useContext(ApiContext);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Auto-close the mobile menu on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    {
      label: { name: "College", path: "/" },
      dropdown: [
        { name: "Connect with Professors", path: "/college/connect" },
        {
          name: "Personalized Recommendations",
          path: "/college/recommendations",
        },
        { name: "College-Specific Forums", path: "/college/forums" },
        { name: "Student-Mentor Connections", path: "/college/mentors" },
        { name: "Tie-Up Benefits", path: "/college/benefits" },
      ],
    },
    {
      label: { name: "Collaboration", path: "/collaboration" },
      dropdown: [
        { name: "Partnered Institutions", path: "/collaboration/partners" },
        {
          name: "Cross-Institution Opportunities",
          path: "/collaboration/opportunities",
        },
        { name: "Exclusive Programs", path: "/collaboration/programs" },
        { name: "Request Tie-Up", path: "/collaboration/request" },
      ],
    },
    {
      label: { name: "Global", path: "/global" },
      dropdown: [
        { name: "Global Mentors", path: "/global/mentors" },
        { name: "Find by Domain", path: "/global/domain" },
        { name: "Fee-Based Mentorship", path: "/global/fee-based" },
        { name: "Featured Mentors", path: "/global/featured" },
      ],
    },
    {
      label: { name: "About Us", path: "/about" },
      dropdown: [
        { name: "Our Mission", path: "/about/mission" },
        { name: "Success Stories", path: "/about/stories" },
        { name: "Team", path: "/about/team" },
        { name: "Contact Us", path: "/about/contact" },
      ],
    },
  ];

  const isActive = (path) => {
    // Check if the current path matches the link or its dropdown
    return (
      location.pathname === path ||
      navLinks.some((link) =>
        link.dropdown.some(
          (sub) =>
            sub.path === path && location.pathname.startsWith(link.label.path)
        )
      )
    );
  };

  return (
    <nav className="bg-[var(--bg-black-100)] sticky top-0 shadow-md z-10">
      <div className="flex justify-between items-center p-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-[var(--skin-color)] font-bold text-xl cursor-pointer"
        >
          MENTLINK
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
            <div key={index} className="relative group">
              <Link to={link.label.path}>
                <button
                  className={`text-[var(--text-black-900)] hover:text-[var(--skin-color)] ${
                    isActive(link.label.path) ? "text-[var(--skin-color)]" : ""
                  }`}
                >
                  {link.label.name}
                </button>
              </Link>
              <div className="absolute left-0 hidden group-hover:block bg-white shadow-lg rounded-md mt-0">
                {link.dropdown.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
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
                <div className="absolute right-0 hidden group-hover:block bg-white shadow-lg rounded-md mt-0">
                  <Link
                    to="/update-profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Update Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Log Out
                  </Link>
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
            <div key={index} className="relative">
              <Link to={link.label.path}>
                <button className="block w-full text-left px-4 py-2 text-black hover:text-[var(--skin-color)]">
                  {link.label.name}
                </button>
              </Link>
              <div className="bg-gray-100">
                {link.dropdown.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
