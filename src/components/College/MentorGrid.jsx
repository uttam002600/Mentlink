import React, { useState, useEffect } from "react";
import MentorCard from "./MentorCard";

const MentorGrid = () => {
  // Mentor Data
  const mentors = [
    {
      photo: "https://via.placeholder.com/150",
      name: "Dr. Ayanokoji",
      designation: "Professor of Computer Science",
      organization: "XYZ College",
      university: "ABC University",
      expertise: ["AI", "Data Science", "Leadership"],
      rating: 4.5,
      batch: "2015",
    },
    {
      photo: "https://via.placeholder.com/150",
      name: "Dr. Ayanokoji",
      designation: "Professor of Computer Science",
      organization: "XYZ College",
      university: "ABC University",
      expertise: ["AI", "Data Science", "Leadership"],
      rating: 4.5,
      batch: "2015",
    },
    {
      photo: "https://via.placeholder.com/150",
      name: "Dr. Ayanokoji",
      designation: "Professor of Computer Science",
      organization: "XYZ College",
      university: "ABC University",
      expertise: ["AI", "Data Science", "Leadership"],
      rating: 4.5,
      batch: "2015",
    },
    {
      photo: "https://via.placeholder.com/150",
      name: "Dr. Ayanokoji",
      designation: "Professor of Computer Science",
      organization: "XYZ College",
      university: "ABC University",
      expertise: ["AI", "Data Science", "Leadership"],
      rating: 4.5,
      batch: "2015",
    },
    {
      photo: "https://via.placeholder.com/150",
      name: "Dr. Ayanokoji",
      designation: "Professor of Computer Science",
      organization: "XYZ College",
      university: "ABC University",
      expertise: ["AI", "Data Science", "Leadership"],
      rating: 4.5,
      batch: "2015",
    },
    {
      photo: "https://via.placeholder.com/150",
      name: "Dr. Ayanokoji",
      designation: "Professor of Computer Science",
      organization: "XYZ College",
      university: "ABC University",
      expertise: ["AI", "Data Science", "Leadership"],
      rating: 4.5,
      batch: "2015",
    },
    {
      photo: "https://via.placeholder.com/150",
      name: "Dr. Ayanokoji",
      designation: "Professor of Computer Science",
      organization: "XYZ College",
      university: "ABC University",
      expertise: ["AI", "Data Science", "Leadership"],
      rating: 4.5,
      batch: "2015",
    },
    {
      photo: "https://via.placeholder.com/150",
      name: "Dr. Ayanokoji",
      designation: "Professor of Computer Science",
      organization: "XYZ College",
      university: "ABC University",
      expertise: ["AI", "Data Science", "Leadership"],
      rating: 4.5,
      batch: "2015",
    },
    {
      photo: "https://via.placeholder.com/150",
      name: "Dr. Ayanokoji",
      designation: "Professor of Computer Science",
      organization: "XYZ College",
      university: "ABC University",
      expertise: ["AI", "Data Science", "Leadership"],
      rating: 4.5,
      batch: "2015",
    },
    {
      photo: "https://via.placeholder.com/150",
      name: "Dr. Ayanokoji",
      designation: "Professor of Computer Science",
      organization: "XYZ College",
      university: "ABC University",
      expertise: ["AI", "Data Science", "Leadership"],
      rating: 4.5,
      batch: "2015",
    },
    {
      photo: "https://via.placeholder.com/150",
      name: "Dr. Ayanokoji",
      designation: "Professor of Computer Science",
      organization: "XYZ College",
      university: "ABC University",
      expertise: ["AI", "Data Science", "Leadership"],
      rating: 4.5,
      batch: "2015",
    },
    {
      photo: "https://via.placeholder.com/150",
      name: "Dr. Ayanokoji",
      designation: "Professor of Computer Science",
      organization: "XYZ College",
      university: "ABC University",
      expertise: ["AI", "Data Science", "Leadership"],
      rating: 4.5,
      batch: "2015",
    },
    {
      photo: "https://via.placeholder.com/150",
      name: "Dr. Ayanokoji",
      designation: "Professor of Computer Science",
      organization: "XYZ College",
      university: "ABC University",
      expertise: ["AI", "Data Science", "Leadership"],
      rating: 4.5,
      batch: "2015",
    },
    {
      photo: "https://via.placeholder.com/150",
      name: "Dr. Ayanokoji",
      designation: "Professor of Computer Science",
      organization: "XYZ College",
      university: "ABC University",
      expertise: ["AI", "Data Science", "Leadership"],
      rating: 4.5,
      batch: "2015",
    },
    {
      photo: "https://via.placeholder.com/150",
      name: "Dr. Ayanokoji",
      designation: "Professor of Computer Science",
      organization: "XYZ College",
      university: "ABC University",
      expertise: ["AI", "Data Science", "Leadership"],
      rating: 4.5,
      batch: "2015",
    },
    {
      photo: "https://via.placeholder.com/150",
      name: "Dr. Ayanokoji",
      designation: "Professor of Computer Science",
      organization: "XYZ College",
      university: "ABC University",
      expertise: ["AI", "Data Science", "Leadership"],
      rating: 4.5,
      batch: "2015",
    },
  ];

  // State to manage pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(8);

  // Update cards per page based on screen width
  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(4); // Small devices
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(6); // Medium devices
      } else {
        setCardsPerPage(8); // Large devices
      }
    };

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);

    return () => {
      window.removeEventListener("resize", updateCardsPerPage);
    };
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(mentors.length / cardsPerPage);

  // Get current page's mentors
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentMentors = mentors.slice(indexOfFirstCard, indexOfLastCard);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="p-6">
      <h2 className="text-[var(--text-black-900)] text-2xl font-bold mb-6 text-center">
        Recommendation Section
      </h2>

      {/* Mentor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentMentors.map((mentor, index) => (
          <MentorCard key={index} mentor={mentor} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              currentPage === index + 1
                ? "bg-[var(--skin-color)] text-white"
                : "bg-[var(--bg-black-50)] text-[var(--text-black-900)]"
            } hover:bg-[var(--skin-color)] hover:text-white transition`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default MentorGrid;
