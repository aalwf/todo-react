/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useState } from "react";

export const Clicker = () => {
  const word = "Elgin Gantenk";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedWord, setDisplayedWord] = useState("");

  const handleButtonClicker = () => {
    if (currentIndex < word.length) {
      setDisplayedWord(displayedWord + word[currentIndex]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleButtonReset = () => {
    setDisplayedWord("");
    setCurrentIndex(0);
  };

  return (
    <>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        {currentIndex === 0
          ? "Click the button for add character"
          : displayedWord}
      </p>
      <button
        type="button"
        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={handleButtonClicker}
      >
        Click me
      </button>
      <button
        type="button"
        id="reset"
        className={`text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ${
          currentIndex >= word.length ? "" : "hidden"
        }`}
        onClick={handleButtonReset}
      >
        Reset
      </button>
    </>
  );
};

Clicker.propTypes = {
  currentIndex: PropTypes.number,
  displayedWord: PropTypes.string,
  word: PropTypes.string,
  onButtonClicker: PropTypes.func,
  onButtonReset: PropTypes.func,
};
