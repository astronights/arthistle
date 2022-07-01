import { AppBar, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import "../assets/css/navbar.sass";
import { getNumber } from "../utils/dateUtil";

const NavBar = () => {
  return (
    <AppBar className="nav-bar" position="sticky">
      <Toolbar className="tool-bar">
        <NavLink className="app-name nav-link" to="/game">
          <span className="text">ARTHISTLE #{getNumber()}</span>
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
          to="/info"
        >
          Info
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
