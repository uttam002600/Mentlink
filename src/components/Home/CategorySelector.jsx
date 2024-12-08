// CategoryBar.js
import React, { useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const categories = [
  "Top Mentors",
  "Engineering",
  "Business",
  "Analysis",
  "Finance",
  "Marketing",
  "Design",
  "Health",
  "Education",
];

const additionalCategories = [
  "Data Science",
  "Cybersecurity",
  "Project Management",
  "Entrepreneurship",
  "Artificial Intelligence",
  "Blockchain",
  "Human Resources",
  "Sales",
];

const CategorySelector = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-[var(--bg-black-100)] shadow-md px-5">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-0">
        <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
          {categories.map((category, index) => (
            <a
              key={index}
              href="#"
              className="text-[var(--text-black-900)] text-lg hover:text-[var(--text-black-700)] transition duration-300"
            >
              {category}
            </a>
          ))}
        </div>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-[var(--text-black-900)] text-lg hover:text-[var(--text-black-700)] transition duration-300 flex items-center"
          >
            More Categories
            <IoIosArrowDropdownCircle className="ml-1 size-7" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[var(--bg-black-900)] shadow-lg rounded-md z-10">
              <div className="py-2">
                {additionalCategories.map((category, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block px-4 py-2 text-[var(--text-black-900)] hover:bg-[var(--bg-black-50)] transition duration-300"
                  >
                    {category}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
