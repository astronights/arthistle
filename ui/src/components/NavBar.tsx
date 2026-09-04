import { AppBar, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "../assets/css/navbar.sass";
import { getNumber } from "../utils/dateUtil";
import Stats from "./Stats";

const NavBar = () => {
  const [statsOpen, setStatsOpen] = useState(false);

  return (
    <AppBar className="nav-bar" position="sticky">
      <Toolbar className="tool-bar">
        <NavLink className="app-name nav-link" to="/">
          <span className="text">ARTHISTLE #{getNumber()}</span>
        </NavLink>
        <div className="space-div"></div>
        <NavLink
          className={({ isActive }) =>
            "nav-link" + (isActive ? " nav-link-active" : "")
          }
          to="/info"
        >
          Info
        </NavLink>
        <button
          type="button"
          className="nav-link nav-action"
          onClick={() => setStatsOpen(true)}
        >
          Stats
        </button>
        <Stats open={statsOpen} onClose={() => setStatsOpen(false)} />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
