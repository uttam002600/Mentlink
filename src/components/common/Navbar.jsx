import React, { useContext, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MdManageAccounts } from "react-icons/md";
import { ApiContext } from "../../Context/ContextProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simulated authentication state

  const { toggleTheme } = useContext(ApiContext);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const navLinks = [
    {
      label: "College",
      dropdown: [
        "Connect with Professors",
        "Personalized Recommendations",
        "College-Specific Forums",
        "Student-Mentor Connections",
        "Tie-Up Benefits",
      ],
    },
    {
      label: "Collaboration",
      dropdown: [
        "Partnered Institutions",
        "Cross-Institution Opportunities",
        "Exclusive Programs",
        "Request Tie-Up",
      ],
    },
    {
      label: "Global",
      dropdown: [
        "Global Mentors",
        "Find by Domain",
        "Fee-Based Mentorship",
        "Featured Mentors",
      ],
    },
    {
      label: "About Us",
      dropdown: ["Our Mission", "Success Stories", "Team", "Contact Us"],
    },
  ];

  return (
    <nav className="bg-[var(--bg-black-100)] sticky top-0 shadow-md z-10">
      <div className="flex justify-between items-center p-4">
        <div className="text-[var(--skin-color)] font-bold text-xl cursor-pointer">
          MENTLINK
        </div>
        <div className="md:hidden">
          <button onClick={toggleDropdown}>
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
        <div className="hidden md:flex space-x-4">
          {navLinks.map((link, index) => (
            <div key={index} className="relative group">
              <button className="text-[var(--text-black-900)] hover:text-[var(--skin-color)]">
                {link.label}
              </button>
              <div className="absolute left-0 hidden group-hover:block bg-white shadow-lg rounded-md mt-0">
                {link.dropdown.map((item, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
          <button
            className="text-[var(--text-black-900)] hover:text-[var(--skin-color)]"
            onClick={toggleTheme}
          >
            Theme
          </button>
        </div>
        <div>
          {isAuthenticated ? (
            <div className="relative group">
              <button className="text-[var(--text-black-900)] hover:text-[var(--skin-color)] flex items-center gap-2 justify-center">
                <MdManageAccounts />
                <span>Account</span>
              </button>

              <div className="absolute right-0 hidden group-hover:block bg-white shadow-lg rounded-md mt-0">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </a>
              </div>
            </div>
          ) : (
            <button className="bg-[var(--skin-color)] text-white px-4 py-2 rounded-md hover:bg-purple-600">
              Login / Register
            </button>
          )}
        </div>
      </div>
      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          {navLinks.map((link, index) => (
            <div key={index} className="relative">
              <button className="block w-full text-left px-4 py-2 text-[var(--text-black-900)] hover:text-[var(--skin-color)]">
                {link.label}
              </button>
              <div className="bg-gray-100">
                {link.dropdown.map((item, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
          <div className="p-4">
            {isAuthenticated ? (
              <div>
                <button className="block w-full text-left text-[var(--text-black-900)] hover:text-[var(--skin-color)]">
                  Account
                </button>
                <div className="bg-gray-100">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    Dashboard
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    Logout
                  </a>
                </div>
              </div>
            ) : (
              <button className="bg-[var(--skin-color)] text-white w-full px-4 py-2 rounded-md">
                Login / Register
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
