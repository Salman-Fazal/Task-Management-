import React, { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  const addTask = (title, description) => {
    setTasks([...tasks, { id: Date.now(), title, description }]);
  };

  const updateTask = (id, title, description) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, title, description } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const setEdit = (task) => {
    setEditTask(task);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, editTask, setEdit }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
