/* eslint-disable react/prop-types */
import { PropTypes } from "prop-types";
import { Button } from "./Button";
import { Filter } from "./Filter";

export const Header = ({
  onHandleButtonClickMe,
  onHandleButtonAdd,
  onHandleFilterChange,
  filterCategory,
}) => {
  return (
    <>
      <div className="my-5">
        <h1 className="text-3xl text-indigo-500 font-extrabold">Todo List</h1>
      </div>
      <div className="flex items-center justify-center">
        <Button onClick={onHandleButtonClickMe} label="Click Me" />
        <Button onClick={onHandleButtonAdd} label="Add Todo" />
        <Filter
          onFilterChange={onHandleFilterChange}
          filterCategory={filterCategory}
        />
      </div>
    </>
  );
};

Header.propTypes = {
  onHandleButtonClickMe: PropTypes.func,
  onHandleButtonAdd: PropTypes.func,
  onHandleFilterChange: PropTypes.func,
  filterCategory: PropTypes.string,
};
