import { useContext, useState, useEffect } from "react";
import MentorCard from "./MentorCard";
import { UserContext } from "../../Context/userProvider";
import LoadingSpinner from "../common/LoadingSpinner";

const RecommendationsSection = () => {
  const { mentors: users, mentorsLoading } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(1);

  // Filter only mentor users with complete data
  const mentors = users?.filter(
    (user) => user.mentorDetails && user.mentorDetails.mentorType
  );

  useEffect(() => {
    // Update cards per page based on screen size
    const updateCardsPerPage = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(3); // Mobile - 1 column
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(4); // Tablet - 2 columns (2x2)
      } else {
        setCardsPerPage(4); // Desktop - 4 columns
      }
    };

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);

    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  useEffect(() => {
    if (mentors) {
      setTotalPages(Math.ceil(mentors.length / cardsPerPage));
    }
  }, [mentors, cardsPerPage]);

  if (mentorsLoading) return <LoadingSpinner />;
  if (!mentors || mentors.length === 0) return null;

  // Get current cards
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = mentors.slice(indexOfFirstCard, indexOfLastCard);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <section className="my-8 px-4 sm:px-6 lg:px-8 relative">
      <h2 className="text-2xl font-bold text-[--text-black-900] mb-6">
        Recommended Mentors
      </h2>

      <div className="relative">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[400px]">
          {currentCards.map((mentor) => (
            <MentorCard key={mentor._id} user={mentor} />
          ))}
        </div>

        {/* Navigation Buttons */}
        {mentors.length > cardsPerPage && (
          <>
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-[--skin-color] text-white flex items-center justify-center shadow-md hover:bg-opacity-90 transition-all ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              &lt;
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-[--skin-color] text-white flex items-center justify-center shadow-md hover:bg-opacity-90 transition-all ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              &gt;
            </button>
          </>
        )}
      </div>

      {/* Pagination Dots */}
      {mentors.length > cardsPerPage && (
        <div className="flex justify-center mt-8 space-x-2">
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
      )}

      {/* Page Numbers (Alternative to dots) */}
      {mentors.length > cardsPerPage && (
        <div className="flex justify-center mt-4 items-center space-x-2">
          <span className="text-sm text-[--text-black-700]">
            Page {currentPage} of {totalPages}
          </span>
          {totalPages > 5 && (
            <select
              value={currentPage}
              onChange={(e) => paginate(Number(e.target.value))}
              className="ml-2 text-sm border rounded px-2 py-1 border-[--skin-color]"
            >
              {Array.from({ length: totalPages }).map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
    </section>
  );
};

export default RecommendationsSection;
