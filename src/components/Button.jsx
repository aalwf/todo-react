/* eslint-disable react/prop-types */
import PropTypes from "prop-types";

export const Button = ({ onClick, label }) => {
  return (
    <button
      type="button"
      className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

Button.PropTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string,
};
