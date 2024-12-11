import React from "react";
import MentorCard from "./MentorCard";

const MentorGrid = () => {
  // you can also pass the props of "mentors"
  const mentors = [
    {
      name: "Uttam Upadhyay",
      role: "Professor",
      experience: 10,
      expertise: ["AI", "Data Science"],
      organisation: "Harvard University",
      fee: 0,
      rating: 4.8,
      reviews: 120,
      image: "profile_image_url",
    },
    {
      name: "Ayano",
      role: "Alumini",
      experience: 10,
      expertise: ["AI", "Data Science"],
      organisation: "Harvard University",
      fee: 120,
      rating: 4.8,
      reviews: 120,
      image: "profile_image_url",
    },
    {
      name: "John Doe",
      role: "Peer Mentor",
      experience: 10,
      expertise: ["AI", "Data Science"],
      organisation: "Harvard University",
      fee: 0,
      rating: 4.8,
      reviews: 120,
      image: "profile_image_url",
    },
    {
      name: "Smith well",
      role: "Professor",
      experience: 10,
      expertise: ["AI", "Data Science"],
      organisation: "Harvard University",
      fee: 0,
      rating: 4.8,
      reviews: 120,
      image: "profile_image_url",
    },
  ];
  return (
    <section className="p-6">
      <h2 className="text-[var(--text-black-900)] text-2xl font-bold mb-6 text-center">
        Recommendation Section
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mentors.map((mentor, index) => (
          <MentorCard key={index} mentor={mentor} />
        ))}
      </div>
    </section>
  );
};

export default MentorGrid;
