// src/components/Footer.jsx

import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[var(--bg-black-100)] text-[var(--text-black-900)] py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h5 className="text-lg font-bold mb-2">About Us</h5>
            <p className="text-sm">
              We are dedicated to connecting mentors and mentees for a better
              learning experience.
            </p>
            <ul className="mt-4">
              <li>
                <a
                  href="#"
                  className="text-[var(--text-black-700)] hover:text-[var(--skin-color)]"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[var(--text-black-700)] hover:text-[var(--skin-color)]"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[var(--text-black-700)] hover:text-[var(--skin-color)]"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Key Services Section */}
          <div>
            <h5 className="text-lg font-bold mb-2">Key Services</h5>
            <ul>
              <li>
                <a
                  href="#"
                  className="text-[var(--text-black-700)] hover:text-[var(--skin-color)]"
                >
                  Find a Professor
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[var(--text-black-700)] hover:text-[var(--skin-color)]"
                >
                  Personalized Recommendations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[var(--text-black-700)] hover:text-[var(--skin-color)]"
                >
                  Exclusive University Access
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h5 className="text-lg font-bold mb-2">Contact Us</h5>
            <p className="text-sm">
              Email:{" "}
              <a
                href="mailto:info@example.com"
                className="text-[var(--text-black-700)] hover:text-[var(--skin-color)]"
              >
                info@example.com
              </a>
            </p>
            <p className="text-sm">Phone: +01 234 567 88</p>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-[var(--text-black-700)] hover:text-[var(--skin-color)]"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-[var(--text-black-700)] hover:text-[var(--skin-color)]"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-[var(--text-black-700)] hover:text-[var(--skin-color)]"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-[var(--text-black-700)] hover:text-[var(--skin-color)]"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Resources Section */}
          <div>
            <h5 className="text-lg font-bold mb-2">Resources</h5>
            <ul>
              <li>
                <a
                  href="#"
                  className="text-[var(--text-black-700)] hover:text-[var(--skin-color)]"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[var(--text-black-700)] hover:text-[var(--skin-color)]"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[var(--text-black-700)] hover:text-[var(--skin-color)]"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[var(--text-black-700)] hover:text-[var(--skin-color)]"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <button className="bg-[var(--skin-color)] text-white px-4 py-2 rounded hover:bg-opacity-80 hover:bg-purple-600">
          Become a Mentor
        </button>
        <button className="bg-[var(--skin-color)] text-white px-4 py-2 rounded hover:bg-opacity-80 ml-4 hover:bg-purple-600">
          Find a Mentor
        </button>
      </div>
      <div className="text-center mt-4">
        <p className="text-sm">© 2024 Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
