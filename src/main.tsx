import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import "./utils/i18n";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const loader = document.querySelector(".loading-screen");
if (loader) {
  loader.classList.add("fade-out");
  setTimeout(() => loader.remove(), 300);
}
