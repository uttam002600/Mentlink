import React, { useContext, useEffect } from "react";
import FilterComponent from "../components/common/FilterComponent";
import { ApiContext } from "../Context/ContextProvider";
import Carousel from "../components/College/Carousal";
import MentorGrid from "../components/College/MentorGrid";

const College = () => {
  // Filter Component
  const { collegeFilterConfig, setCollegeFilterConfig } =
    useContext(ApiContext);

  useEffect(() => {
    setCollegeFilterConfig((prevConfig) => ({
      ...prevConfig,
      industryType: false,
      mentorType: true,
      feeRange: false,
      university: true,
    }));
  }, []);

  const handleApplyFilters = (filters) => {
    console.log("Applied Filters:", filters);
  };

  const handleResetFilters = () => {
    console.log("Filters Reset");
  };

  // Carousal
  const slides = [
    {
      image: "assets/Carousal/college1.jpg",
      title: "Explore Top Colleges",
      description: "Connect with mentors from top colleges worldwide.",
      buttonText: "View Mentors",
    },
    {
      image: "assets/Carousal/college2.jpg",
      title: "Alumini Expert Guidance",
      description:
        "Get guidance from alunimi network associating to your organization.",
      buttonText: "Explore Now",
    },
    {
      image: "assets/Carousal/college3.jpg",
      title: "Peer Mentorship",
      description: "Learn and grow with experienced peers.",
      buttonText: "Join Now",
    },
  ];

  return (
    <>
      <FilterComponent
        config={collegeFilterConfig}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />
      <Carousel slides={slides} />
      <MentorGrid />
    </>
  );
};

export default College;
