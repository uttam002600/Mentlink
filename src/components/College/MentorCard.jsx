// Card Component
import React from "react";

const MentorCard = ({ mentor }) => {
  return (
    <div className="bg-[var(--bg-black-100)] text-[var(--text-black-900)] rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
      {/* Profile Image */}
      <div className="flex items-center space-x-4">
        <img
          src={mentor.image}
          alt={mentor.name}
          className="w-16 h-16 rounded-full border-2 border-[var(--skin-color)]"
        />
        <div>
          <h3 className="font-bold text-lg">{mentor.name}</h3>
          <p className="text-[var(--text-black-700)] text-sm">{mentor.role}</p>
        </div>
      </div>

      {/* Details */}
      <div className="mt-4">
        <p className="text-[var(--text-black-700)] text-sm">
          <span className="font-medium">Experience:</span> {mentor.experience}{" "}
          years
        </p>
        <p className="text-[var(--text-black-700)] text-sm">
          <span className="font-medium">Expertise:</span>{" "}
          {mentor.expertise.join(", ")}
        </p>
        <p className="text-[var(--text-black-700)] text-sm">
          <span className="font-medium">Organisation:</span>{" "}
          {mentor.organisation}
        </p>
        <p className="text-[var(--text-black-700)] text-sm">
          <span className="font-medium">Fee:</span> ${mentor.fee}/hr
        </p>
      </div>

      {/* Footer Section */}
      <div className="mt-4 flex justify-between items-center">
        <p className="flex items-center text-[var(--text-black-700)]">
          <span className="text-[var(--skin-color)] font-medium">
            {mentor.rating}★
          </span>
          <span className="ml-2 text-sm">({mentor.reviews} reviews)</span>
        </p>
        <button className="bg-[var(--skin-color)] text-white py-1 px-3 rounded-lg hover:bg-[var(--text-black-700)] transition-colors duration-300">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default MentorCard;
