import React from "react";
import "./NavBarStyles.css";
import { NavLink } from "react-router";

const NavBar = () => {
  return (
    <nav className="navbar">
      {/* Currently, we're using <a> tags to navigate to different pages.
      This means that every time we click on a link, the page will reload.
      Let's fix that!
      */}
      {/* <a href="/">All Tasks</a>
      <a href="/completed">Completed Tasks</a>
      <a href="/incomplete">Incomplete Tasks</a>
      <a href="/add-task">Add Task</a> */}
      <NavLink to="/">All Tasks</NavLink>
      <NavLink to="/completed">Completed Tasks</NavLink>
      <NavLink to="/incomplete">Incomplete Tasks</NavLink>
      <NavLink to="/add-task">Add Task</NavLink>
    </nav>
  );
};

export default NavBar;
