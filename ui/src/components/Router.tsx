import React from "react";
import Game from "./Game";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Info from "./Info";
import "../assets/css/page.sass";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Game />} />
      <Route path="/info" element={<Info />} />
      {/* The game used to live here too; keep old links working. */}
      <Route path="/game" element={<Navigate to="/" replace />} />
      <Route
        path="*"
        element={
          <main className="page not-found">
            <h2>There's nothing here</h2>
            <p>
              <Link to="/">Back to today's Arthistle</Link>
            </p>
          </main>
        }
      />
    </Routes>
  );
};

export default Router;
