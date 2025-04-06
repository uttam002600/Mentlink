import React from "react";

const StylishParagraph = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--bg-black-100)] p-4">
      <div className="bg-[var(--bg-black-200)] p-6 rounded-lg shadow-lg max-w-2xl text-center">
        <p className="text-[var(--text-black-900)] text-lg">
          Soon updating and bringing the{" "}
          <span className="text-[var(--skin-color)] font-bold">
            cool features for the collaboration between colleges and
            universities
          </span>
        </p>
      </div>
    </div>
  );
};

export default StylishParagraph;
