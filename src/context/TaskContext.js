"use client"; // Use Context on client side.
import { createContext, useContext } from "react";
import { v4 as uuid } from "uuid";
import useLocalStorage from "@/hooks/useLocalStorage";

export const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);

  if (!context) throw new Error("useTask must be used within a provider.");

  return context;
};

export const TaskProvider = ({ children }) => {

  // Local storage.

  const [tasks, setTasks] = useLocalStorage('tasks', []);
 
  const createTask = (title, description) =>
    setTasks([...tasks, { id: uuid(), title, description }]);

  const deleteTask = (id) =>
    setTasks([...tasks.filter((task) => task.id !== id)]);

  const updateTask = (id, newData) => 
    setTasks([
      ...tasks.map((task) =>
        task.id === id ? { ...task, ...newData } : task
      ),
    ]);

  return (
    <TaskContext.Provider value={{ tasks, createTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
