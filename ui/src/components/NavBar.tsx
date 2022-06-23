import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
// import "../assets/css/Component.scss";

const NavBar = () => {
  return (
    <AppBar className="nav-bar" position="sticky">
      <Toolbar>
        <NavLink className="app-name nav-link" to="/home">
          <span className="full-text">Artistle</span>
          <span className="short-text">Artistle</span>
        </NavLink>
        <NavLink
          className={(isActive) => "nav-link" + (!isActive ? "" : "active")}
          to="/home"
        >
          Home
        </NavLink>
        <NavLink
          className={(isActive) => "nav-link" + (!isActive ? "" : "active")}
          to="/about"
        >
          About
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
