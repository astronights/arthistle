import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// Self-hosted so the fonts are part of the bundle rather than a
// render-blocking request to Google Fonts.
import "@fontsource/arvo/400.css";
import "@fontsource/arvo/700.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "./assets/css/index.sass";
import App from "./components/App";

const container: HTMLElement = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
