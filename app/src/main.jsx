import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

/* Anchor links are plain hrefs; let the browser handle the smooth scroll. */
document.documentElement.style.scrollBehavior = "smooth";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
