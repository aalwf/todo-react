import { useState, useEffect } from "react";

function App() {
  const word = "Elgin Gantenk";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedWord, setDisplayedWord] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(true);

  const defaultItems = [
    {
      id: 1,
      name: "Default Item",
      category: "Default Category",
      status: false,
    },
  ];

  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : defaultItems;
  });

  const [newItem, setNewItem] = useState("");
  const [newCategory, setNewCategory] = useState("Personal");
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleButtonClick = () => {
    if (currentIndex < word.length) {
      setDisplayedWord(displayedWord + word[currentIndex]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleButtonReset = () => {
    setDisplayedWord("");
    setCurrentIndex(0);
  };

  const handleButtonAdd = () => {
    setModalVisible(true);
    setModalContent(false);
    setIsEditing(false);
    setNewItem("");
    setNewCategory("Personal");
  };

  const handleButtonClickMe = () => {
    setModalVisible(true);
    setModalContent(true);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newItem.trim() !== "") {
      if (isEditing) {
        setItems(
          items.map((item) =>
            item.id === currentItem.id
              ? { ...item, name: newItem, category: newCategory }
              : item
          )
        );
        setIsEditing(false);
        setCurrentItem(null);
      } else {
        setItems([
          ...items,
          {
            id: items.length + 1,
            name: newItem,
            category: newCategory,
            status: false,
          },
        ]);
      }
      setNewItem("");
      setNewCategory("Personal");
      setModalVisible(false);
    }
  };

  const handleToggleStatus = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, status: !item.status } : item
    );
    setItems(updatedItems);
  };

  const handleChangeName = (e) => {
    setNewItem(e.target.value);
  };

  const handleChangeCategory = (e) => {
    setNewCategory(e.target.value);
  };

  const handleEditTodo = (e, item) => {
    e.stopPropagation(); // Stop propagation here
    setNewItem(item.name);
    setNewCategory(item.category);
    setIsEditing(true);
    setCurrentItem(item);
    setModalVisible(true);
    setModalContent(false);
  };

  const handleDeleteTodo = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const filteredItems =
    filterCategory === "All"
      ? items
      : items.filter((item) => item.category === filterCategory);

  return (
    <div className="text-center">
      <div className="my-5">
        <h1 className="text-3xl text-indigo-500 font-extrabold">Todo List</h1>
      </div>
      <div className="flex items-center justify-center">
        <button
          type="button"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={handleButtonClickMe}
        >
          Click me
        </button>
        <button
          type="button"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={handleButtonAdd}
        >
          Add Todo
        </button>
        <select
          id="filterCategory"
          name="filterCategory"
          value={filterCategory}
          onChange={handleFilterChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
        >
          <option value="All">All</option>
          <option value="Personal">Personal</option>
          <option value="Home">Home</option>
          <option value="Work">Work</option>
        </select>
      </div>

      <div className="container mx-auto">
        <div className="relative pt-6 overflow-x-auto shadow-md sm:rounded-lg">
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
                    onClick={() => handleToggleStatus(item.id)}
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
                        onClick={(e) => handleEditTodo(e, item)}
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
                          handleDeleteTodo(item.id);
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
                        onChange={() => handleToggleStatus(item.id)}
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
        </div>
      </div>

      {modalVisible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setModalVisible(false)}
        >
          <div
            className="relative p-4 w-full max-w-2xl h-full md:h-auto bg-white rounded-lg shadow dark:bg-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                {modalContent
                  ? "Clicker"
                  : isEditing
                  ? "Edit Todo"
                  : "Add Todo"}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setModalVisible(false)}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-6 space-y-6">
              {modalContent ? (
                <>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {currentIndex === 0
                      ? "Click the button for add character"
                      : displayedWord}
                  </p>
                  <button
                    type="button"
                    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    onClick={handleButtonClick}
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
              ) : (
                <div className="p-4 md:p-5">
                  <form className="space-y-4" onSubmit={handleAddTodo}>
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
                        onChange={handleChangeName}
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
                        onChange={handleChangeCategory}
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
              )}
            </div>
            {modalContent && (
              <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => setModalVisible(false)}
                >
                  Oke
                </button>
                <button
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={() => setModalVisible(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
