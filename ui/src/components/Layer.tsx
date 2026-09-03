import NavBar from "./NavBar";
import Router from "./Router";
import "../assets/css/layer.sass";
import { Mode } from "../config/theme";

interface LayerProps {
  mode: Mode;
  onToggleMode: () => void;
}

const Layer = (props: LayerProps) => {
  return (
    <div className="layer">
      <NavBar mode={props.mode} onToggleMode={props.onToggleMode} />
      <Router />
    </div>
  );
};

export default Layer;
