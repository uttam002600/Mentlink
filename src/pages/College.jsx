import React, { useContext, useEffect } from "react";
import FilterComponent from "../components/College/FilterComponent";
import { ApiContext } from "../Context/ContextProvider";

const College = () => {
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

  return (
    <>
      <FilterComponent
        config={collegeFilterConfig}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />
    </>
  );
};

export default College;
