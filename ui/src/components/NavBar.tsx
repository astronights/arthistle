import { AppBar, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import "../assets/css/navbar.sass";
import { getNumber } from "../utils/dateUtil";
import { Mode } from "../config/theme";

interface NavBarProps {
  mode: Mode;
  onToggleMode: () => void;
}

const NavBar = (props: NavBarProps) => {
  const toLight = props.mode === "dark";

  return (
    <AppBar className="nav-bar" position="sticky">
      <Toolbar className="tool-bar">
        <NavLink className="app-name nav-link" to="/game">
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
          onClick={props.onToggleMode}
          aria-label={toLight ? "Switch to light mode" : "Switch to dark mode"}
        >
          {toLight ? "Light" : "Dark"}
        </button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
