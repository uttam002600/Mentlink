// Testimonials.js
import React, { useState } from "react";
import TestimonialCard from "../common/TestimonialCard";

const testimonials = [
  {
    photo: "https://via.placeholder.com/150",
    name: "John Doe",
    role: "Mentee",
    quote: "MentLink has completely transformed my career trajectory!",
    successHighlight: "Landed a job at a top tech company.",
  },
  {
    photo: "https://via.placeholder.com/150",
    name: "Jane Smith",
    role: "Mentor",
    quote:
      "Being a mentor has been one of the most rewarding experiences of my life.",
    successHighlight: "Helped over 20 mentees achieve their goals.",
  },
  {
    photo: "https://via.placeholder.com/150",
    name: "Alice Johnson",
    role: "Mentee",
    quote:
      "The guidance I received was invaluable. I feel more confident than ever.",
    successHighlight: "Promoted to a managerial position.",
  },
  // Add more testimonial objects as needed
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-10 px-5 bg-[var(--bg-black-100)]">
      <h1 className="text-3xl font-bold text-center mb-2 text-[var(--text-black-900)] ">
        What Our Users Say
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Hear from mentors and mentees who have transformed their careers with
        MentLink.
      </p>
      <div className="relative">
        <div className="flex overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`transition-transform duration-500 ease-in-out w-full ${
                index === currentIndex ? "block" : "hidden"
              }`}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
          <button
            onClick={prevTestimonial}
            className="bg-[var(--bg-white)] text-[var(--text-black-900)] p-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
          >
            &lt;
          </button>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
          <button
            onClick={nextTestimonial}
            className="bg-[var(--bg-white)] text-[var(--text-black-900)] p-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
          >
            &gt;
          </button>
        </div>
        <div className="flex justify-center mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 mx-1 bg-gray-300 rounded-full ${
                currentIndex === index ? "bg-green-400" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
