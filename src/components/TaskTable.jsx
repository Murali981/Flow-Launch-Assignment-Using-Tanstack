/* eslint-disable */

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import PropTypes from "prop-types";
import { useTaskTable } from "../hooks/useTaskTable";
import { getColumns } from "./table/TableColumns";
import TableHeader from "./table/TableHeader";
import TablePagination from "./table/TablePagination";
import { useMemo } from "react";

const STATUS_OPTIONS = ["To Do", "In Progress", "Done"];

const TaskTable = ({ initialTasks, apiEndpoint }) => {
  const {
    globalFilter,
    setGlobalFilter,
    statusFilter,
    setStatusFilter,
    handleAddRow,
    handleDeleteRow,
    handleCellEdit,
    filteredData,
  } = useTaskTable(initialTasks, apiEndpoint);

  const columns = useMemo(
    () => getColumns(handleDeleteRow, handleCellEdit),
    [handleDeleteRow, handleCellEdit]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <TableHeader
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        handleAddRow={handleAddRow}
      />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TablePagination table={table} filteredData={filteredData} />
    </div>
  );
};

TaskTable.propTypes = {
  initialTasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.oneOf(STATUS_OPTIONS).isRequired,
    })
  ),
  apiEndpoint: PropTypes.string,
};

TaskTable.defaultProps = {
  initialTasks: null,
  apiEndpoint: "https://jsonplaceholder.typicode.com/todos",
};

export default TaskTable;
