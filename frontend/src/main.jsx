import React from "react"
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CoachContextProvider } from "./context/Coachcontext.jsx";
import { GroundContextProvider } from "./context/GroundContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CoachContextProvider>
      <GroundContextProvider>
        <App />
      </GroundContextProvider>
    </CoachContextProvider>
  </BrowserRouter>
);
