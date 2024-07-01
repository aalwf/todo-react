/* eslint-disable react/prop-types */
import { PropTypes } from "prop-types";

export const TodoAdd = ({
  onAddTodo,
  newItem,
  onChangeName,
  newCategory,
  onChangeCategory,
  isEditing,
}) => {
  return (
    <div className="p-4 md:p-5">
      <form className="space-y-4" onSubmit={onAddTodo}>
        <div>
          <label
            htmlFor="todo"
            className="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Todo name
          </label>
          <input
            type="text"
            name="todo"
            id="todo"
            value={newItem}
            onChange={onChangeName}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Todo Name"
            required
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Category
          </label>
          <select
            name="category"
            id="category"
            value={newCategory}
            onChange={onChangeCategory}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          >
            <option value="Personal">Personal</option>
            <option value="Home">Home</option>
            <option value="Work">Work</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isEditing ? "Update Todo" : "Save Todo"}
        </button>
      </form>
    </div>
  );
};

TodoAdd.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
  newItem: PropTypes.string.isRequired,
  onChangeName: PropTypes.func.isRequired,
  newCategory: PropTypes.string.isRequired,
  onChangeCategory: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};
