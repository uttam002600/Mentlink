import React from "react";

const MentorCard = ({ mentor }) => {
  return (
    <div className="bg-[var(--bg-black-100)] shadow-md rounded-lg p-4 max-w-sm mx-auto">
      {/* Mentor Image */}
      <div className="flex items-center space-x-4">
        <img
          src={mentor.photo}
          alt={mentor.name}
          className="w-16 h-16 rounded-full border-2 border-[var(--skin-color)]"
        />
        <div>
          {/* Name and Designation */}
          <h2 className="text-[var(--text-black-900)] text-lg font-semibold">
            {mentor.name}
          </h2>
          <p className="text-[var(--text-black-700)] text-sm">
            {mentor.designation}
          </p>
        </div>
      </div>

      {/* Organization & University */}
      <div className="mt-4">
        <p className="text-[var(--text-black-900)] text-sm">
          <span className="font-bold">Organization:</span> {mentor.organization}
        </p>
        <p className="text-[var(--text-black-900)] text-sm">
          <span className="font-bold">University:</span> {mentor.university}
        </p>
      </div>

      {/* Expertise */}
      <div className="mt-4">
        <h3 className="text-[var(--text-black-900)] font-bold text-sm">
          Expertise:
        </h3>
        <ul className="flex flex-wrap gap-2 mt-1">
          {mentor.expertise.map((skill, index) => (
            <li
              key={index}
              className="bg-[var(--bg-black-50)] text-[var(--text-black-900)] text-xs px-2 py-1 rounded-md"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>

      {/* Batch (Optional) */}
      {mentor.batch && (
        <div className="mt-4">
          <p className="text-[var(--text-black-900)] text-sm">
            <span className="font-bold">Batch:</span> {mentor.batch}
          </p>
        </div>
      )}

      {/* Rating */}
      <div className="mt-4 flex items-center">
        <p className="text-[var(--text-black-900)] text-sm font-bold">
          Rating: {mentor.rating}
        </p>
        <div className="ml-2 flex">
          {Array.from({ length: Math.round(mentor.rating) }, (_, i) => (
            <span key={i} className="text-[var(--skin-color)] text-sm mr-1">
              ★
            </span>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-4">
        <button className="bg-[var(--skin-color)] text-white text-sm px-4 py-2 rounded-md hover:bg-red-600 transition">
          Connect
        </button>
      </div>
    </div>
  );
};

export default MentorCard;
