import React from "react";

const LoadingSpinner = ({ label = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 border-4 border-[--skin-color] border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-[--text-black-900] font-semibold">{label}</p>
    </div>
  );
};

export default LoadingSpinner;
