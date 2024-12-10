import React, { useContext, useState } from "react";
import { ApiContext } from "../../Context/ContextProvider";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ApiContext);

  // const [isNightMode, setIsNightMode] = useState(
  //   document.body.classList.contains("dark")
  // );

  return (
    <div
      onClick={() => {
        toggleTheme();
      }}
      className="cursor-pointer flex items-center justify-center bg-[var(--bg-black-50)] dark:bg-[var(--bg-black-900)] p-2 w-12 h-12 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
      title="Toggle Theme"
    >
      {theme === "dark" ? (
        <BsMoonFill className="text-blue-500 text-xl" /> // Moon icon for day mode
      ) : (
        <BsSunFill className="text-yellow-400 text-xl" /> // Sun icon for night mode
      )}
    </div>
  );
};

export default ThemeToggle;
