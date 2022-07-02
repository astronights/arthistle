import React from "react";
import Game from "./Game";
import { Routes, Route } from "react-router-dom";
import Info from "./Info";
import "../assets/css/page.sass";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/game" element={<Game />} />
      <Route path="/info" element={<Info />} />
      <Route path="/" element={<Game />} />
      <Route
        path="*"
        element={
          <main>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  );
};

export default Router;
