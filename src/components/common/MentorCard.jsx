// MentorCard.js
import React from "react";

const MentorCard = ({ mentor }) => {
  return (
    <div className="bg-[var(--bg-black-100)] rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
      <img
        src={mentor.image}
        alt={mentor.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-[var(--text-black-900)]">
          {mentor.name}
        </h2>
        <p className="text-[var(--text-black-700)] mb-1">
          {mentor.experience} | {mentor.domain}
        </p>
        <div className="flex items-center mb-2">
          <span className="text-yellow-500">{"★".repeat(mentor.rating)}</span>
          <span className="text-[var(--text-black-700)] ml-2">
            ({mentor.rating})
          </span>
        </div>
        <p className="text-lg font-semibold mb-2 text-[var(--text-black-900)]">
          ${mentor.fee}
        </p>
        <div className="text-sm text-[var(--text-black-700)] mb-4">
          <p>Years of Experience: {mentor.yearsOfExperience}</p>
          <p>Languages Spoken: {mentor.languages}</p>
          <p>Location: {mentor.location}</p>
        </div>
        <button className="bg-[var(--skin-color)] text-white py-2 px-4 rounded hover:bg-[var(--text-black-700)] transition duration-300 w-full">
          View Profile
        </button>
        <div className="mt-2">
          {mentor.badges.map((badge, index) => (
            <span
              key={index}
              className="inline-block bg-[var(--bg-black-50)] text-[var(--text-black-900)] text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
