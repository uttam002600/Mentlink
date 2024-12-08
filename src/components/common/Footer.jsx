// Footer.js
import React from "react";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[var(--bg-black-900)] text-[var(--text-black-900)]">
      {/* Footer Top Section */}
      <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {/* Column 1: About MentLink */}
        <div>
          <h3 className="text-lg font-bold mb-4">About MentLink</h3>
          <p className="mb-4">
            MentLink is dedicated to connecting aspiring professionals with
            seasoned mentors to foster growth and innovation.
          </p>
          <ul>
            <li>
              <a href="/about" className="hover:text-[var(--text-black-700)]">
                About Us
              </a>
            </li>
            <li>
              <a href="/careers" className="hover:text-[var(--text-black-700)]">
                Careers
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-[var(--text-black-700)]">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Column 2: Resources */}
        <div>
          <h3 className="text-lg font-bold mb-4">Resources</h3>
          <ul>
            <li>
              <a href="/faqs" className="hover:text-[var(--text-black-700)]">
                FAQs
              </a>
            </li>
            <li>
              <a href="/help" className="hover:text-[var(--text-black-700)]">
                Help Center
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-[var(--text-black-700)]">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-[var(--text-black-700)]">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Us */}
        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p>
            Email:{" "}
            <a
              href="mailto:support@mentlink.com"
              className="hover:text-[var(--text-black-700)]"
            >
              support@mentlink.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a
              href="tel:+18001234567"
              className="hover:text-[var(--text-black-700)]"
            >
              +1-800-123-4567
            </a>
          </p>
          <p>Address: 123 Professional Way, Silicon Valley, CA 94027</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-[var(--text-black-700)]">
              <FaLinkedin size={20} />
            </a>
            <a href="#" className="hover:text-[var(--text-black-700)]">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-[var(--text-black-700)]">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-[var(--text-black-700)]">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* Column 4: Mobile App */}
        <div>
          <h3 className="text-lg font-bold mb-4">Mobile App</h3>
          <p className="mb-4">Access MentLink on the go with our mobile app!</p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-[var(--text-black-900)] text-xl bg-[var(--skin-color)] py-2 px-4 rounded hover:bg-[var(--text-black-700)]"
            >
              App Store
            </a>
            <a
              href="#"
              className="text-[var(--text-black-900)] text-xl bg-[var(--skin-color)] py-2 px-4 rounded hover:bg-[var(--text-black-700)]"
            >
              Google Play
            </a>
          </div>
          {/* Optional QR Code */}
          {/* <img src="path_to_qr_code.png" alt="QR Code" className="mt-4" /> */}
        </div>
      </div>

      {/* Footer Middle Section */}
      <div className="bg-[var(--bg-black-100)] py-6 text-center">
        <h2 className="text-[var(--text-black-700)] text-lg font -bold mb-4">
          Are you ready to start your mentorship journey?
        </h2>
        <div className="flex justify-center space-x-4">
          <button className="text-[var(--text-black-900)] text-xl bg-[var(--skin-color)] py-2 px-4 rounded hover:bg-[var(--text-black-700)]">
            Become a Mentor
          </button>
          <button className="text-[var(--text-black-900)] text-xl bg-[var(--skin-color)] py-2 px-4 rounded hover:bg-[var(--text-black-700)]">
            Find a Mentor
          </button>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="bg-[var(--bg-black-900)] text-[var(--text-black-100)] py-4 flex justify-between items-center px-4">
        <p>© 2024 MentLink. All rights reserved.</p>
        <div className="space-x-4">
          <a href="/terms" className="hover:text-[var(--text-black-700)]">
            Terms & Conditions
          </a>
          <a href="/privacy" className="hover:text-[var(--text-black-700)]">
            Privacy Policy
          </a>
          <a href="/cookies" className="hover:text-[var(--text-black-700)]">
            Cookie Settings
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
