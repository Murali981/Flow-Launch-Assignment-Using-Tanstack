/* eslint-disable */
import { Trash2 } from "lucide-react";
import EditableCell from "./EditableCell";

export const getColumns = (handleDeleteRow, onCellEdit) => [
  {
    accessorKey: "id",
    header: "ID",
    size: 70,
    enableEditing: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: (props) => <EditableCell {...props} onCellEdit={onCellEdit} />,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (props) => <EditableCell {...props} onCellEdit={onCellEdit} />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (props) => <EditableCell {...props} onCellEdit={onCellEdit} />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <button
        onClick={() => handleDeleteRow(row.original.id)}
        className="p-1 hover:bg-gray-100 rounded text-red-600"
      >
        <Trash2 size={16} />
      </button>
    ),
  },
];
