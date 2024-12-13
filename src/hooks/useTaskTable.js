import { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";

export const useTaskTable = (initialTasks, apiEndpoint) => {
  const [tasks, setTasks] = useState(initialTasks || []);
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editedRows, setEditedRows] = useState({});

  useEffect(() => {
    if (!initialTasks) {
      fetchTasks();
    }
  }, [initialTasks]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      const formattedTasks = data.map((task) => ({
        id: task.id,
        title: task.title,
        description: `Task description ${task.id}`,
        status: task.completed ? "Done" : "To Do",
      }));
      setTasks(formattedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks");
    }
  };

  const handleAddRow = () => {
    const newTask = {
      id: tasks.length + 1,
      title: "New Task",
      description: "Click to edit",
      status: "To Do",
    };
    setTasks([newTask, ...tasks]);
    setEditedRows((prev) => ({ ...prev, [newTask.id]: true }));
    toast.success("New row added! Click to edit.");
  };

  const handleDeleteRow = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      return updatedTasks;
    });
    toast.success("Task deleted successfully!");
  };

  const handleCellEdit = (rowId, columnId, value) => {
    setTasks((prev) =>
      prev.map((row) => {
        if (row.id === rowId) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const filteredData = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;
      const matchesSearch =
        task.title.toLowerCase().includes(globalFilter.toLowerCase()) ||
        task.description.toLowerCase().includes(globalFilter.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [tasks, statusFilter, globalFilter]);

  return {
    tasks,
    globalFilter,
    setGlobalFilter,
    statusFilter,
    setStatusFilter,
    handleAddRow,
    handleDeleteRow,
    handleCellEdit,
    filteredData,
  };
};
