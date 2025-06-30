import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import "./AppStyles.css";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import NavBar from "./components/NavBar";
import TaskDetails from "./components/TaskDetails"
import { BrowserRouter as Router, Routes, Route } from "react-router";

// const initialTasks = [
//     {
//       title: "Get eight hours of sleep",
//       description: "Sleepy time tea is a must",
//       completed: false,
//     },
//     {
//       title: "EOD survey",
//       description: "The EOD survey is always linked in the Discord",
//       completed: true,
//     },
//     {
//       title: "Install PostgreSQL",
//       description: "Don't forget your PostgreSQL password!",
//       completed: true,
//     },
//   ];

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const complete = tasks.filter(task => task.completed === true);
  const incomplete = tasks.filter(task => task.completed === false);

  async function fetchAllTasks() {
    try {
      const response = await axios.get("http://localhost:8080/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  async function fetchAllUsers() {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    fetchAllTasks();
    fetchAllUsers();
  }, []);

  return (
    <div>
      <NavBar />
      {/* <TaskList tasks={tasks} fetchAllTasks={fetchAllTasks} />
      <AddTask fetchAllTasks={fetchAllTasks} /> */}
      <Routes>
        {/* Currently, we don't have any routes defined. And you can see above that we're
            rendering the TaskList and AddTask components directly, no matter what our URL looks like.
            Let's fix that! */}
        <Route path="/" element={<TaskList tasks={tasks} fetchAllTasks={fetchAllTasks}/>} />
        <Route path="/completed" element={<TaskList tasks={complete} fetchAllTasks={fetchAllTasks}/>} />
        <Route path="/incomplete" element={<TaskList tasks={incomplete} fetchAllTasks={fetchAllTasks}/>} />
        <Route path="/add-task" element={<AddTask fetchAllTasks={fetchAllTasks}/>} />
        <Route path="/:id" element={<TaskDetails tasks={tasks} users={users} fetchAllTasks={fetchAllTasks} />} />
      </Routes>
    </div>
  );
};

// We're using React Router to handle the navigation between pages.
// It's important that the Router is at the top level of our app,
// and that we wrap our entire app in it. With this in place, we can
// declare routes, Links, and use useful hooks like useNavigate.
const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
