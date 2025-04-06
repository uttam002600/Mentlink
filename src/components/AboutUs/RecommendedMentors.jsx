// RecommendedMentors.js
import React from "react";
import MentorCard from "../common/MentorCard";

const mentors = [
  {
    image: "https://via.placeholder.com/150",
    name: "John Doe",
    experience: "10 years",
    domain: "Software Development",
    rating: 5,
    fee: 100,
    yearsOfExperience: 10,
    languages: "English, Spanish",
    location: "New York, USA",
    badges: ["Top Rated", "Certified"],
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Jane Smith",
    experience: "8 years",
    domain: "Digital Marketing",
    rating: 4,
    fee: 80,
    yearsOfExperience: 8,
    languages: "English, French",
    location: "Los Angeles, USA",
    badges: ["Best for Beginners"],
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Alice Johnson",
    experience: "5 years",
    domain: "Graphic Design",
    rating: 4,
    fee: 60,
    yearsOfExperience: 5,
    languages: "English",
    location: "London, UK",
    badges: ["Certified"],
  },
  // Add more mentor objects as needed
];

const RecommendedMentors = () => {
  return (
    <section className="py-10 px-5">
      <h1 className="text-3xl font-bold text-center mb-2">
        Recommended Mentors for You
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Handpicked experts tailored to your goals.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor, index) => (
          <MentorCard key={index} mentor={mentor} />
        ))}
      </div>
    </section>
  );
};

export default RecommendedMentors;
