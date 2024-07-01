/* eslint-disable react/prop-types */
import { PropTypes } from "prop-types";

export const Table = ({
  filteredItems,
  onEditTodo,
  onDeleteTodo,
  onToggleStatus,
}) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Todo Name
          </th>
          <th scope="col" className="px-6 py-3">
            Category
          </th>
          <th scope="col" className="px-6 py-3">
            Status
          </th>
          <th scope="col" className="px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <tr
              key={item.id}
              className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 cursor-pointer ${
                item.status ? "line-through" : ""
              }`}
              onClick={() => onToggleStatus(item.id)}
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.name}
              </td>
              <td className="px-6 py-4">{item.category}</td>
              <td className="px-6 py-4">
                {item.status ? "Completed" : "Not Completed"}
              </td>
              <td className="flex items-center justify-around py-4">
                <button
                  type="button"
                  className={`${
                    item.status
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-500"
                  } mr-2`}
                  onClick={(e) => onEditTodo(e, item)}
                  disabled={item.status}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className={`${
                    item.status
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-500"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteTodo(item.id);
                  }}
                  disabled={item.status}
                >
                  Delete
                </button>
                <input
                  id="default-checkbox"
                  type="checkbox"
                  className="form-checkbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 dark:bg-gray-700 dark:border-gray-600 outline-none focus:outline-none focus-visible:outline-none"
                  checked={item.status}
                  onChange={() => onToggleStatus(item.id)}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="4"
              className="text-center py-5 text-base leading-relaxed text-red-500 dark:text-red-400"
            >
              Items not found!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  filteredItems: PropTypes.array,
  onEditTodo: PropTypes.func,
  onDeleteTodo: PropTypes.func,
  onToggleStatus: PropTypes.func,
};
