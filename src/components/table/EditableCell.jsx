/* eslint-disable */

import { useState } from "react";
import toast from "react-hot-toast";

const EditableCell = ({ getValue, row, column, table, onCellEdit }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const onBlur = () => {
    setIsEditing(false);
    if (value !== initialValue) {
      onCellEdit(row.original.id, column.id, value);
      toast.success("Cell updated successfully!");
    }
  };

  if (column.id === "status" && isEditing) {
    return (
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        autoFocus
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {["To Do", "In Progress", "Done"].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  if (isEditing) {
    return (
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        autoFocus
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    );
  }

  return (
    <div
      className="cursor-pointer p-2 -m-2 rounded hover:bg-gray-100"
      onClick={() => setIsEditing(true)}
    >
      {column.id === "status" ? (
        <span
          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            value === "Done"
              ? "bg-green-100 text-green-800"
              : value === "In Progress"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {value}
        </span>
      ) : (
        value
      )}
    </div>
  );
};

export default EditableCell;
