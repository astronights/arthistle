import React from "react";
import Home from "./Home";
import About from "./About";
import { Routes, Route } from "react-router-dom";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Home />} />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  );
};

export default Router;
