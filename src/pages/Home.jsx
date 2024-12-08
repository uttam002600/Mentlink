import React from "react";
import CategorySelector from "../components/Home/CategorySelector";
import HeroSection from "../components/Home/HeroSection";
import RecommendedMentors from "../components/Home/RecommendedMentors";
import Testimonials from "../components/Home/Testimonials";
import AboutUs from "../components/Home/AboutUs";

const Home = () => {
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

export default Home;
