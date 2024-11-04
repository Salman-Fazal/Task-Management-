import React, { useState } from "react";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputTitle || !inputDescription) return;

    if (editId) {
      setTasks(tasks.map(task =>
        task.id === editId
          ? { ...task, title: inputTitle, description: inputDescription }
          : task
      ));
      setEditId(null); 
    } else {
      const newTask = {
        id: Date.now(),
        title: inputTitle,
        description: inputDescription,
      };
      setTasks([...tasks, newTask]);
    }

    setInputTitle("");
    setInputDescription("");
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEdit = (task) => {
    setInputTitle(task.title);
    setInputDescription(task.description);
    setEditId(task.id);
  };

  return (
    <div className='container'>
      <h2>{editId ? "Edit Task" : "Add New Task"}</h2>
      <form className="my-form" onSubmit={handleSubmit}>
        <label htmlFor="title" className="label-title">Enter Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
        
        <label className="label-enter" htmlFor="description">Enter Description</label>
        
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          value={inputDescription}
          onChange={(e) => setInputDescription(e.target.value)}
        />
        
        <button className="btn">
          {editId ? "Update" : "Save"}
        </button>
      </form>

      <div className='task-list'>
        <h3>Tasks</h3>
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                {task.title} : {task.description}
                <button onClick={() => handleEdit(task)}>Edit</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Todo;
