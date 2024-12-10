import React, { useState, useEffect } from "react";

const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically move the slider every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [slides.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-[350px] overflow-hidden bg-[var(--bg-black-100)]">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 h-full ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-full flex items-center justify-center bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Slider Content */}
            <div className="text-center p-8 bg-[rgba(0,0,0,0.6)] rounded-lg max-w-xl">
              <h1 className="text-4xl md:text-5xl text-white font-bold">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-white my-4">
                {slide.description}
              </p>
              <button className="bg-[var(--skin-color)] text-white py-3 px-6 rounded-lg text-lg hover:bg-purple-600 transition duration-300">
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute text-black top-1/2 left-6 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
      >
        &#8592;
      </button>
      <button
        onClick={goToNext}
        className="absolute text-black top-1/2 right-6 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
      >
        &#8594;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-[var(--skin-color)]" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
