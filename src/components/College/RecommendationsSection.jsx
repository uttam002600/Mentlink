import { useContext, useState, useEffect, useMemo } from "react";
import MentorCard from "./MentorCard";
import { UserContext } from "../../Context/userProvider";
import LoadingSpinner from "../common/LoadingSpinner";
import FilterComponent from "../common/FilterComponent";
import { debounce } from "lodash";
import { ApiContext } from "../../Context/ContextProvider";

const RecommendationsSection = () => {
  const { mentors: users, mentorsLoading } = useContext(UserContext);
  const { filterMentors, sortMentors } = useContext(ApiContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [filters, setFilters] = useState({});

  // Filter configuration for the FilterComponent
  const filterConfig = {
    search: true,
    mentorType: true,
    categories: true,
    college: true,
    expertise: true,
    yearsOfExperience: true, // for professors
    batchPassout: true, // for alumni
    currentYear: true, // for peer group
    minRating: true,
    // industryType: true,
    // specialization: true,
    // university: true,
    // feeRange: true,
    // ratings: true,
    // availability: true,
  };

  // Filter only mentor users with complete data
  const allMentors = useMemo(() => {
    return (users || []).filter((user) => user?.mentorDetails?.mentorType);
  }, [users]);

  // Apply filters and sorting using context functions
  const filteredMentors = useMemo(() => {
    let result = allMentors;

    if (Object.keys(filters).length > 0) {
      result = filterMentors(result, filters);
    }

    if (filters.sortBy) {
      result = sortMentors(result, filters.sortBy);
    }

    return result;
  }, [allMentors, filters, filterMentors, sortMentors]);

  // Debounced filter application
  const debouncedApplyFilters = useMemo(
    () =>
      debounce((newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1); // Reset to first page when filters change
      }, 300),
    []
  );

  // Handle filter changes
  const handleApplyFilters = (newFilters) => {
    debouncedApplyFilters(newFilters);
  };

  // Handle filter reset
  const handleResetFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  // Responsive cards per page
  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 768) {
        setCardsPerPage(2);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(3);
      } else {
        setCardsPerPage(4);
      }
    };

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(filteredMentors.length / cardsPerPage);

  // Get current cards
  const currentCards = useMemo(() => {
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    return filteredMentors.slice(indexOfFirstCard, indexOfLastCard);
  }, [currentPage, cardsPerPage, filteredMentors]);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (mentorsLoading) return <LoadingSpinner />;

  return (
    <section className="my-8 px-4 sm:px-6 lg:px-8 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[--text-black-900]">
          Recommended Mentors
        </h2>
      </div>

      <FilterComponent
        config={filterConfig}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      {/* Results Count */}
      <div className="text-sm text-[--text-black-700] mb-4">
        Showing{" "}
        {filteredMentors.length === 0
          ? 0
          : (currentPage - 1) * cardsPerPage + 1}
        -{Math.min(currentPage * cardsPerPage, filteredMentors.length)} of{" "}
        {filteredMentors.length} mentors
      </div>

      {/* No Results Message */}
      {filteredMentors.length === 0 && !mentorsLoading && (
        <div className="text-center py-12 text-[--text-black-700]">
          No mentors found matching your criteria
        </div>
      )}

      {/* Cards Grid */}
      <div className="relative">
        {filteredMentors.length > 0 && (
          <div
            className={`grid gap-6 ${
              cardsPerPage === 1
                ? "grid-cols-1"
                : cardsPerPage === 2
                ? "grid-cols-2"
                : cardsPerPage === 3
                ? "grid-cols-3"
                : "grid-cols-4"
            }`}
          >
            {currentCards.map((mentor) => (
              <div key={mentor._id} className="w-full h-full min-h-[400px]">
                <MentorCard user={mentor} />
              </div>
            ))}
          </div>
        )}

        {/* Navigation Buttons */}
        {filteredMentors.length > cardsPerPage && (
          <>
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[--skin-color] text-white flex items-center justify-center shadow-md hover:bg-opacity-90 transition-all ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label="Previous page"
            >
              &lt;
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[--skin-color] text-white flex items-center justify-center shadow-md hover:bg-opacity-90 transition-all ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              aria-label="Next page"
            >
              &gt;
            </button>
          </>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredMentors.length > cardsPerPage && (
        <div className="mt-8">
          {/* Pagination Dots */}
          <div className="flex justify-center space-x-2 mb-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentPage === index + 1
                    ? "bg-[--skin-color] scale-125"
                    : "bg-gray-300"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          {/* Page Numbers */}
          <div className="flex justify-center items-center space-x-4">
            <span className="text-sm text-[--text-black-700]">
              Page {currentPage} of {totalPages}
            </span>
            {totalPages > 5 && (
              <select
                value={currentPage}
                onChange={(e) => paginate(Number(e.target.value))}
                className="text-sm border rounded px-2 py-1 border-[--skin-color] bg-[--bg-black-100] text-[--text-black-900]"
              >
                {Array.from({ length: totalPages }).map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    Page {index + 1}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default RecommendationsSection;
