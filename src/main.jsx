import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "primereact/resources/themes/lara-light-purple/theme.css"; // tema
import "primereact/resources/primereact.min.css"; // core
import "primeicons/primeicons.css"; // íconos

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
