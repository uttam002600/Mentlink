// Navbar.js
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { ApiContext } from "../../Context/ContextProvider";

const Navbar = () => {
  const { toggleTheme } = useContext(ApiContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-[var(--bg-black-900)] shadow-custom ">
      <h1 className="text-[var(--skin-color)] text-2xl font-bold">MentLink</h1>
      <div className="hidden md:flex space-x-6">
        <Link
          className="text-[var(--text-black-900)] hover:bg-[var(--bg-black-50)] px-3 py-2 rounded"
          to="/"
        >
          Home
        </Link>
        <Link
          className="text-[var(--text-black-900)] hover:bg-[var(--bg-black-50)] px-3 py-2 rounded"
          to="/about"
        >
          About Us
        </Link>
        <Link
          className="text-[var(--text-black-900)] hover:bg-[var(--bg-black-50)] px-3 py-2 rounded"
          to="/find-mentors"
        >
          Find Mentors
        </Link>
        <Link
          className="text-[var(--text-black-900)] hover:bg-[var(--bg-black-50)] px-3 py-2 rounded"
          to="/dashboard"
        >
          Dashboard
        </Link>
        <Link
          className="text-[var(--text-black-900)] hover:bg-[var(--bg-black-50)] px-3 py-2 rounded"
          to=""
          onClick={toggleTheme}
        >
          Theme
        </Link>
        <div className="text-[var(--text-black-900)] px-3 py-2 cursor-pointer">
          {isLoggedIn ? "👤" : <Link to="/login">Login/Signup</Link>}
        </div>
      </div>
      <div className="md:hidden ">
        <button onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <FaTimes className="text-[var(--text-black-900)]" />
          ) : (
            <FaBars className="text-[var(--text-black-900)]" />
          )}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="absolute top-16 right-0 w-full bg-[var(--bg-black-100)] shadow-lg md:hidden z-10">
          <Link
            className="block text-[var(--text-black-900)] hover:bg-[var(--bg-black-50)] px-4 py-2"
            to="/"
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
          <Link
            className="block text-[var(--text-black-900)] hover:bg-[var(--bg-black-50)] px-4 py-2"
            to="/about"
            onClick={toggleMobileMenu}
          >
            About Us
          </Link>
          <Link
            className="block text-[var(--text-black-900)] hover:bg-[var(--bg-black-50)] px-4 py-2"
            to="/find-mentors"
            onClick={toggleMobileMenu}
          >
            Find Mentors
          </Link>
          <Link
            className="block text-[var(--text-black-900)] hover:bg-[var(--bg-black-50)] px-4 py-2"
            to="/dashboard"
            onClick={toggleMobileMenu}
          >
            Dashboard
          </Link>
          <Link
            className="block text-[var(--text-black-900)] hover:bg-[var(--bg-black-50)] px-4 py-2"
            to="/dashboard"
            onClick={() => {
              toggleMobileMenu();
              toggleTheme();
            }}
          >
            Theme
          </Link>
          <Link
            className="block text-[var(--text-black-900)] hover:bg-[var(--bg-black-50)] px-4 py-2"
            to="/login"
            onClick={toggleMobileMenu}
          >
            Login/Signup
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
