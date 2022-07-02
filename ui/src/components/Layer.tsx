import NavBar from "./NavBar";
import Router from "./Router";
import "../assets/css/layer.sass";

const Layer = () => {
  return (
    <div className="layer">
      <NavBar />
      <Router />
    </div>
  );
};

export default Layer;
