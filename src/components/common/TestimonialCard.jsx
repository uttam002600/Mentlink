// TestimonialCard.js
import React from "react";

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-[var(--bg-white)] rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
      <img
        src={testimonial.photo}
        alt={testimonial.name}
        className="w-24 h-24 rounded-full mb-4"
      />
      <blockquote className="text-lg italic mb-4 text-[var(--text-black-900)]">
        <p className="relative before:content-['“'] before:absolute before:-left-6 before:-top-4 before:text-[var(--skin-color)] before:text-5xl">
          {testimonial.quote}
        </p>
      </blockquote>
      <h3 className="font-bold text-lg text-[var(--text-black-900)]">
        {testimonial.name}
      </h3>
      <p className="text-gray-500">{testimonial.role}</p>
      <p className="text-gray-600 mt-2">{testimonial.successHighlight}</p>
    </div>
  );
};

export default TestimonialCard;
