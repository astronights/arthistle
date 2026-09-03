import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// Self-hosted so the fonts are part of the bundle rather than a
// render-blocking request to Google Fonts.
import "@fontsource/eb-garamond/400.css";
import "@fontsource/eb-garamond/600.css";
import "@fontsource/eb-garamond/700.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "./assets/css/index.sass";
import App from "./components/App";
import { applyMode, getInitialMode } from "./config/theme";

// Settled before the first paint so the page never flashes the wrong palette.
applyMode(getInitialMode());

const container: HTMLElement = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
