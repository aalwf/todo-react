/* eslint-disable react/prop-types */
import PropTypes from "prop-types";

export const Filter = ({ onFilterChange, filterCategory }) => {
  return (
    <select
      id="filterCategory"
      name="filterCategory"
      value={filterCategory}
      onChange={onFilterChange}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
    >
      <option value="All">All</option>
      <option value="Personal">Personal</option>
      <option value="Home">Home</option>
      <option value="Work">Work</option>
    </select>
  );
};

Filter.PropTypes = {
  onFilterChange: PropTypes.func,
  filterCategory: PropTypes.string,
};
