import React from "react";
import ReactDOM from "react-dom/client";
import Portfolio from "./App";
import "./style.css";

/* Persisted theme (dark/light) */
const saved = localStorage.getItem("theme");
const prefersDark =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

if (saved === "dark" || (!saved && prefersDark)) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>
);

