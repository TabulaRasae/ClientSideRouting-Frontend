import React, { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "./TaskCardStyles.css";

const TaskDetails = ({ tasks, users, fetchAllTasks }) => {
  const params = useParams();
  const id = Number(params.id);

  // useEffect(() => {
  //   // Fetch the ducks here
  // }, []);

  const selectedTask = tasks.find((task) => task.id === id);
  const selectedTaskUser = users.find((user) => user.id ===  selectedTask.userId);
  const selectedTaskUserName = selectedTaskUser.name;

  const handleCompleteSelectedTask = async () => {
    try {
      await axios.patch(`http://localhost:8080/api/tasks/${selectedTask.id}`, {
        completed: !selectedTask.completed,
      });
      fetchAllTasks();
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleDeleteSelectedTask = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${selectedTask.id}`);
      fetchAllTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className={`task-card ${selectedTask.completed ? "completed" : "incomplete"}`}>
      <div className="task-card-header">
        <h2>{selectedTask.title}</h2>
        <div className="task-card-header-buttons">
          {selectedTask.completed ? (
            <p onClick={handleCompleteSelectedTask}>🔄</p>
          ) : (
            <p onClick={handleCompleteSelectedTask}>✅</p>
          )}
          <p onClick={handleDeleteSelectedTask}>🗑️</p>
        </div>
      </div>
      <p>{selectedTask.description}</p>
      <p>User: {selectedTaskUserName}</p>
    </div>
  );
};

export default TaskDetails;