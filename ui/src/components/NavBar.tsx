import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/navbar.sass";

const NavBar = () => {
  return (
    <AppBar className="nav-bar" position="sticky">
      <Toolbar className="tool-bar">
        <NavLink className="app-name nav-link" to="/game">
          <span className="text">ARTHISTLE</span>
        </NavLink>
        <div className="space-div"></div>
        <NavLink
          className={(isActive) =>
            "nav-link" + (!isActive.isActive ? "" : "-active")
          }
          to="/game"
        >
          Home
        </NavLink>
        <NavLink
          className={(isActive) =>
            "nav-link" + (!isActive.isActive ? "" : "-active")
          }
          to="/about"
        >
          About
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;