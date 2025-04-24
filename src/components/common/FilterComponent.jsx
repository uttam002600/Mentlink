import React, { useState, useEffect, useContext } from "react";
import { debounce } from "lodash";
import { ApiContext } from "../../Context/ContextProvider";

const FilterComponent = ({ config, onApply, onReset }) => {
  const [filters, setFilters] = useState({});
  const [feeRange, setFeeRange] = useState({ min: 0, max: 500 });
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { authUser } = useContext(ApiContext);

  // Load saved filters from localStorage
  useEffect(() => {
    const savedFilters = localStorage.getItem("mentorFilters");
    if (savedFilters) {
      const parsedFilters = JSON.parse(savedFilters);
      setFilters(parsedFilters);
      if (parsedFilters.feeRange) {
        setFeeRange(parsedFilters.feeRange);
      }
      if (parsedFilters.search) {
        setSearchQuery(parsedFilters.search);
      }
    }
  }, []);

  // Debounced filter application
  const debouncedApply = debounce((filters) => {
    localStorage.setItem("mentorFilters", JSON.stringify(filters));
    onApply(filters);
  }, 300);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    debouncedApply(newFilters);
  };

  const handleFeeChange = (type, value) => {
    const newRange = { ...feeRange, [type]: parseInt(value) };
    setFeeRange(newRange);
    handleFilterChange("feeRange", newRange);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleFilterChange("search", value);
  };

  const handleReset = () => {
    const resetFilters = {};
    setFilters(resetFilters);
    setFeeRange({ min: 0, max: 500 });
    setSearchQuery("");
    localStorage.removeItem("mentorFilters");
    onReset();
  };

  const toggleFilterSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-[var(--bg-black-100)] text-[var(--text-black-900)] p-4 rounded shadow-lg">
      {/* Horizontal Bar with Open Filter Button */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b-2 border-[var(--bg-black-50)] pb-4 mb-4 gap-2">
        {/* Welcome message - appears first on mobile, right on desktop */}
        <div className="order-1 md:order-2 w-full md:w-auto text-center md:text-right">
          {authUser ? (
            <span className=" bg-opacity-20 bg-[var(--skin-color)] text-[var(--text-vlack-100)] px-3 py-1 rounded-full font-bold text-sm md:text-base ">
              Welcome, {authUser.fullName}
            </span>
          ) : (
            <span className=" bg-[var(--skin-color)] text-[var(--text-vlack-100)] px-3 py-1 rounded-full font-medium text-sm md:text-base">
              Login to connect
            </span>
          )}
        </div>

        {/* Filter button - appears second on mobile, left on desktop */}
        <button
          onClick={toggleFilterSection}
          className="order-2 md:order-1 text-[var(--skin-color)] font-semibold flex items-center space-x-2"
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
      </div>

      {/* Filter Section (Collapsible) */}
      {isOpen && (
        <div className="flex flex-wrap justify-between md:flex-row lg:flex-wrap xl:flex-row space-y-4 md:space-y-0">
          {/* Search Input */}
          <div className="mb-4 w-full">
            <label className="block text-[var(--text-black-700)] font-medium mb-2">
              Search Mentors
            </label>
            <input
              type="text"
              placeholder="Search by name, specialization, etc..."
              className="bg-[var(--bg-black-50)] text-[var(--text-black-900)] p-2 rounded w-full"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

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
                value={filters.mentorType || ""}
              >
                <option value="">All Types</option>
                <option value="professor">Professor</option>
                <option value="alumni">Alumni</option>
                <option value="peer_group">Peer Mentor</option>
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
                  handleFilterChange("industryType", e.target.value)
                }
                value={filters.industryType || ""}
              >
                <option value="">All Industries</option>
                <option value="Engineering">Engineering</option>
                <option value="Business">Business</option>
                <option value="Finance">Finance</option>
                <option value="Counseling">Counseling</option>
                <option value="Technology">Technology</option>
              </select>
            </div>
          )}

          {/* Specialization Dropdown - Now multiple select */}
          {config.specialization && (
            <div className="mb-4 w-full md:w-1/2 lg:w-1/4">
              <label className="block text-[var(--text-black-700)] font-medium mb-2">
                Specialization
              </label>
              <select
                multiple
                className="bg-[var(--bg-black-50)] text-[var(--text-black-900)] p-2 rounded w-full h-[42px] min-h-[42px]"
                onChange={(e) => {
                  const options = e.target.options;
                  const selected = [];
                  for (let i = 0; i < options.length; i++) {
                    if (options[i].selected) {
                      selected.push(options[i].value);
                    }
                  }
                  handleFilterChange("specializations", selected);
                }}
                value={filters.specializations || []}
              >
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Cloud">Cloud</option>
                <option value="Stock">Stock/Investing</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Mobile Development">Mobile Development</option>
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
                value={filters.university || ""}
              >
                <option value="">All Institutions</option>
                <option value="collegeA">College A</option>
                <option value="collegeB">College B</option>
                <option value="universityA">University A</option>
                <option value="universityB">University B</option>
              </select>
            </div>
          )}

          {/* Enhanced Fee Range Slider */}
          {config.feeRange && (
            <div className="mb-4 w-full md:w-1/2 lg:w-1/4">
              <label className="block text-[var(--text-black-700)] font-medium mb-2">
                Fee Range (per hour)
              </label>
              <div className="flex space-x-4 mb-2">
                <div className="w-1/2">
                  <label className="block text-sm text-[var(--text-black-700)]">
                    Min
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="500"
                    value={feeRange.min}
                    className="bg-[var(--bg-black-50)] text-[var(--text-black-900)] p-2 rounded w-full"
                    onChange={(e) => handleFeeChange("min", e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm text-[var(--text-black-700)]">
                    Max
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="500"
                    value={feeRange.max}
                    className="bg-[var(--bg-black-50)] text-[var(--text-black-900)] p-2 rounded w-full"
                    onChange={(e) => handleFeeChange("max", e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-between text-xs text-[var(--text-black-700)]">
                <span>$0</span>
                <span>
                  ${feeRange.min} - ${feeRange.max}
                </span>
                <span>$500</span>
              </div>
            </div>
          )}

          {/* Ratings Dropdown */}
          {config.ratings && (
            <div className="mb-4 w-full md:w-1/2 lg:w-1/4">
              <label className="block text-[var(--text-black-700)] font-medium mb-2">
                Minimum Rating
              </label>
              <select
                className="bg-[var(--bg-black-50)] text-[var(--text-black-900)] p-2 rounded w-full"
                onChange={(e) =>
                  handleFilterChange("minRating", e.target.value)
                }
                value={filters.minRating || ""}
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
                <option value="3">3+ Stars</option>
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
                checked={filters.availability || false}
              />
            </div>
          )}

          {/* Sort Dropdown */}
          <div className="mb-4 w-full md:w-1/2 lg:w-1/4">
            <label className="block text-[var(--text-black-700)] font-medium mb-2">
              Sort By
            </label>
            <select
              className="bg-[var(--bg-black-50)] text-[var(--text-black-900)] p-2 rounded w-full"
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              value={filters.sortBy || ""}
            >
              <option value="">Default</option>
              <option value="rating-desc">Rating (High to Low)</option>
              <option value="rating-asc">Rating (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="price-asc">Price (Low to High)</option>
            </select>
          </div>

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
              onClick={handleReset}
            >
              Reset All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
