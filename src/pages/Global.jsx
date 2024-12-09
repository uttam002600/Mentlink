import React from "react";
import CategorySelector from "../components/Global/CategorySelector";
import HeroSection from "../components/Global/HeroSection";
import RecommendedMentors from "../components/Global/RecommendedMentors";
import Testimonials from "../components/Global/Testimonials";
import AboutUs from "../components/Global/AboutUs";

const Global = () => {
  return (
    <>
      <CategorySelector />
      <HeroSection />
      <RecommendedMentors />
      <AboutUs />
      <Testimonials />
    </>
  );
};

export default Global;
