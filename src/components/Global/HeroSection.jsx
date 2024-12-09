import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

const images = [
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fG1lbnRvcnxlbnwwfHx8fDE2ODI0MjY0MjM&ixlib=rb-4.0.3&q=80&w=600",
  "https://friscochamber.com/wp-content/uploads/2022/09/young-businessman-and-his-mature-mentor-having-a-conversation-768x512.jpg",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEwfHxjb250YWN0fGVufDB8fHx8MTY4MjQyNjQyMw&ixlib=rb-4.0.3&q=80&w=600",
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-full h-screen flex flex-col md:flex-row items-center justify-between bg-[var(--bg-black-100)] hero z-0">
      {/* Left Panel (Text) */}
      <div className="w-full md:w-1/2 p-10">
        <h1 className="text-4xl font-bold text-[var(--text-black-900)] mb-4">
          Connecting Passionate Mentors with Ambitious Mentees.
        </h1>
        <p className="text-lg text-[var(--text-black-700)] mb-6">
          Find your guide or give back by mentoring the next generation of
          leaders.
        </p>
        <div className="flex space-x-4">
          <a
            href="#"
            className="text-white bg-[var(--skin-color)] py-2 px-4 rounded hover:bg-green-400 transition duration-300 flex items-center"
          >
            Find a Mentor <FaArrowRight className="ml-2" />
          </a>
          <a
            href="#"
            className="text-[var(--text-black-900)] border border-[var(--skin-color)] py-2 px-4 rounded hover:bg-[var(--skin-color)] hover:text-white transition duration-300 flex items-center"
          >
            Become a Mentor <FaArrowRight className="ml-2" />
          </a>
        </div>
      </div>

      {/* Right Panel (Image/Graphic) */}
      <div className="h-[400px] w-full md:w-1/2 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={images[currentIndex]}
            alt={`Mentor Interaction ${currentIndex + 1}`}
            className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-500"
          />
        </div>
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
          <button
            onClick={prevImage}
            className="bg-white text-black p-2 rounded-full shadow-md hover:bg-[var(--bg-black-50)] transition duration-300"
          >
            &lt;
          </button>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
          <button
            onClick={nextImage}
            className="bg-white text-black p-2 rounded-full shadow-md hover:bg-[var(--bg-black-50)] transition duration-300"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
