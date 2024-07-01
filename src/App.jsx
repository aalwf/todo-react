import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Table } from "./components/Table";
import { Modal } from "./components/Modal";

function App() {
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
  const [newCategory, setNewCategory] = useState([
    "All",
    "Personal",
    "Home",
    "Work",
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

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
      <Header
        onHandleButtonClickMe={handleButtonClickMe}
        onHandleButtonAdd={handleButtonAdd}
        onHandleFilterChange={handleFilterChange}
        filterCategory={filterCategory}
      />

      <div className="container mx-auto relative pt-6 overflow-x-auto shadow-md sm:rounded-lg">
        <Table
          filteredItems={filteredItems}
          onEditTodo={handleEditTodo}
          onDeleteTodo={handleDeleteTodo}
          onToggleStatus={handleToggleStatus}
        />
      </div>

      {modalVisible && (
        <Modal
          onSetModalVisible={setModalVisible}
          modalContent={modalContent}
          onAddTodo={handleAddTodo}
          newItem={newItem}
          handleChangeName={handleChangeName}
          isEditing={isEditing}
        />
      )}
    </div>
  );
}

export default App;

