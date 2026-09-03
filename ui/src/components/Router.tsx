import React from "react";
import Game from "./Game";
import { Routes, Route, Link } from "react-router-dom";
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
          <main className="page not-found">
            <h2>There's nothing here</h2>
            <p>
              <Link to="/game">Back to today's Arthistle</Link>
            </p>
          </main>
        }
      />
    </Routes>
  );
};

export default Router;
