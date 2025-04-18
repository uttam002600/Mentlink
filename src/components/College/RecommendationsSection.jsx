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
    const updateCardsPerPage = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(1); // Mobile - 1 column
      } else if (window.innerWidth < 768) {
        setCardsPerPage(2); // Small tablet - 2 columns
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(3); // Tablet - 3 columns
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
  if (!mentors || mentors.length === 0)
    return (
      <section className="my-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[--text-black-900] mb-6">
          Recommended Mentors
        </h2>
        <div className="text-center py-12 text-[--text-black-700]">
          No mentors found matching your criteria
        </div>
      </section>
    );

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

        {/* Navigation Buttons */}
        {mentors.length > cardsPerPage && (
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
      {mentors.length > cardsPerPage && (
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
