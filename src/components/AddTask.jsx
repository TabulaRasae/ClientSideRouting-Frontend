import React, { useState } from "react";
import axios from "axios";
import "./AddTaskStyles.css";
import { useNavigate } from "react-router";

const AddTask = ({ fetchAllTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/tasks", {
        title,
        description,
      });
      // After we submit the form, it'd be great if we could navigate back to the home page.
      // Is there a way to programmatically navigate to the home page? 🤔
      fetchAllTasks();
      navigate("/");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="add-task-container">
      <h1>Add a Task</h1>
      <form onSubmit={handleSubmit} className="add-task-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTask;
