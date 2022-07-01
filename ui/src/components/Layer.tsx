import NavBar from "./NavBar";
import Router from "./Router";

const Layer = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flexGrow: 1,
      }}
    >
      <NavBar />
      <Router />
    </div>
  );
};

export default Layer;
