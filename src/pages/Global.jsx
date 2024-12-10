import React, { useContext, useEffect } from "react";
import CategorySelector from "../components/Global/CategorySelector";
import HeroSection from "../components/Global/HeroSection";
import RecommendedMentors from "../components/Global/RecommendedMentors";
import Testimonials from "../components/Global/Testimonials";
import AboutUs from "../components/Global/AboutUs";
import { ApiContext } from "../Context/ContextProvider";
import FilterComponent from "../components/common/FilterComponent";

const Global = () => {
  //Filter Component
  const { collegeFilterConfig, setCollegeFilterConfig } =
    useContext(ApiContext);

  useEffect(() => {
    setCollegeFilterConfig((prevConfig) => ({
      ...prevConfig,
      industryType: true,
      mentorType: false,
      feeRange: true,
      university: false,
    }));
  }, []);

  const handleApplyFilters = (filters) => {
    console.log("Applied Filters:", filters);
  };

  const handleResetFilters = () => {
    console.log("Filters Reset");
  };

  return (
    <>
      <FilterComponent
        config={collegeFilterConfig}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />
      <CategorySelector />
      <HeroSection />
      <RecommendedMentors />
      <AboutUs />
      <Testimonials />
    </>
  );
};

export default Global;
