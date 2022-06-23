import React from "react";
import Game from "./Game";
import About from "./About";
import { Routes, Route } from "react-router-dom";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/game" element={<Game />} />
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Game />} />
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
