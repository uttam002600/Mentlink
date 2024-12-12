import React, { useState } from "react";

const FilterComponent = ({ config, onApply, onReset }) => {
  const [filters, setFilters] = useState({});
  const [fee, setFee] = useState(0);
  const [isOpen, setIsOpen] = useState(false); // State to manage the visibility of the filter section

  // Function to handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleFeeChange = (value) => {
    setFee(value); // Update fee value in state
    handleFilterChange("feeRange", value);
  };

  const toggleFilterSection = () => {
    setIsOpen(!isOpen); // Toggle the filter section visibility
  };

  return (
    <div className="bg-[var(--bg-black-100)] text-[var(--text-black-900)] p-4 rounded shadow-lg">
      {/* Horizontal Bar with Open Filter Button */}
      <div className="flex items-center justify-between border-b-2 border-[var(--bg-black-50)] pb-4 mb-4">
        <button
          onClick={toggleFilterSection}
          className="text-[var(--skin-color)] font-semibold flex items-center space-x-2"
        >
          <span>{isOpen ? "Close Filters" : "Open Filters"}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className={`bi bi-chevron-${isOpen ? "up" : "down"}`}
            viewBox="0 0 16 16"
          >
            <path d="M3.646 4.646a.5.5 0 0 1 .708 0L8 7.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>

        {/* Rightmost part: Filter */}
      </div>

      {/* Filter Section (Collapsible) */}
      {isOpen && (
        <div className="flex flex-wrap justify-between md:flex-row lg:flex-wrap xl:flex-row space-y-4 md:space-y-0 ">
          {/* Mentor Type Dropdown */}
          {config.mentorType && (
            <div className="mb-4 w-full md:w-1/2 lg:w-1/4">
              <label className="block text-[var(--text-black-700)] font-medium mb-2">
                Mentor Type
              </label>
              <select
                className="bg-[var(--bg-black-50)] text-[var(--text-black-900)] p-2 rounded w-full"
                onChange={(e) =>
                  handleFilterChange("mentorType", e.target.value)
                }
              >
                <option value="">All Types</option>
                <option value="professor">Professor</option>
                <option value="alumni">Alumni</option>

                <option value="peer">Peer Mentor</option>
              </select>
            </div>
          )}

          {/* Industry Type Dropdown */}
          {config.industryType && (
            <div className="mb-4 w-full md:w-1/2 lg:w-1/4">
              <label className="block text-[var(--text-black-700)] font-medium mb-2">
                Industry Type
              </label>
              <select
                className="bg-[var(--bg-black-50)] text-[var(--text-black-900)] p-2 rounded w-full"
                onChange={(e) =>
                  handleFilterChange("mentorType", e.target.value)
                }
              >
                <option value="">All Types</option>
                <option value="Engineering">Engineering</option>
                <option value="Business">Business</option>
                <option value="industry-Expert">Industry Expert</option>
                <option value="Business"> Business</option>
                <option value="Finance"> Finance</option>
                <option value="Councelling"> Councelling</option>
              </select>
            </div>
          )}

          {/* Specialization Dropdown */}
          {config.specialization && (
            <div className="mb-4 w-full md:w-1/2 lg:w-1/4">
              <label className="block text-[var(--text-black-700)] font-medium mb-2">
                Specialization
              </label>
              <select
                className="bg-[var(--bg-black-50)] text-[var(--text-black-900)] p-2 rounded w-full"
                onChange={(e) =>
                  handleFilterChange("specialization", e.target.value)
                }
              >
                <option value="">All Specializations</option>
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Cloud">Cloud</option>
                <option value="Stock">Stock/Investing</option>
              </select>
            </div>
          )}

          {/* University/College Dropdown */}
          {config.university && (
            <div className="mb-4 w-full md:w-1/2 lg:w-1/4">
              <label className="block text-[var(--text-black-700)] font-medium mb-2">
                University/College
              </label>
              <select
                className="bg-[var(--bg-black-50)] text-[var(--text-black-900)] p-2 rounded w-full"
                onChange={(e) =>
                  handleFilterChange("university", e.target.value)
                }
              >
                <option value="">All Institutions</option>
                <option value="collegeA">College A</option>
                <option value="collegeB">College B</option>
                <option value="universityA">University A</option>
              </select>
            </div>
          )}

          {/* Fee Range Slider */}
          {config.feeRange && (
            <div className="mb-4 w-full md:w-1/2 lg:w-1/4">
              <label className="block text-[var(--text-black-700)] font-medium mb-2">
                Fee Range
              </label>
              <div className="flex justify-between">
                <span className="text-[var(--text-black-700)]">0</span>
                <span className="text-[var(--text-black-700)]">${fee}/hr</span>
                <span className="text-[var(--text-black-700)]">500</span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                value={fee}
                className="w-full"
                onChange={(e) => handleFeeChange(e.target.value)}
              />
            </div>
          )}

          {/* Ratings Dropdown */}
          {config.ratings && (
            <div className="mb-4 w-full md:w-1/2 lg:w-1/4">
              <label className="block text-[var(--text-black-700)] font-medium mb-2">
                Ratings
              </label>
              <select
                className="bg-[var(--bg-black-50)] text-[var(--text-black-900)] p-2 rounded w-full"
                onChange={(e) => handleFilterChange("ratings", e.target.value)}
              >
                <option value="">All Ratings</option>
                <option value="4">4 Stars & Above</option>
                <option value="3">3 Stars & Above</option>
                <option value="2">2 Stars & Above</option>
              </select>
            </div>
          )}

          {/* Availability Toggle */}
          {config.availability && (
            <div className="flex items-center mb-4 w-full md:w-1/2 lg:w-1/4">
              <label className="block text-[var(--text-black-700)] font-medium mr-2">
                Available Now
              </label>
              <input
                type="checkbox"
                className="w-5 h-5 text-[var(--skin-color)]"
                onChange={(e) =>
                  handleFilterChange("availability", e.target.checked)
                }
              />
            </div>
          )}

          {/* Buttons */}
          <div className="mt-4 md:mt-0 md:flex md:space-x-4 w-full md:w-1/2 lg:w-auto">
            <button
              className="bg-[var(--skin-color)] text-white py-2 px-4 rounded hover:bg-[var(--text-black-700)]"
              onClick={() => onApply(filters)}
            >
              Apply Filters
            </button>
            <button
              className="bg-[var(--bg-black-50)] text-[var(--text-black-900)] py-2 px-4 rounded hover:bg-[var(--text-black-700)]"
              onClick={onReset}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
