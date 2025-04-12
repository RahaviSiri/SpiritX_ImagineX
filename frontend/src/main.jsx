import React from "react"
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CoachContextProvider } from "./context/Coachcontext.jsx";
import { GroundContextProvider } from "./context/GroundContext.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <CoachContextProvider>
        <GroundContextProvider>
          <App />
        </GroundContextProvider>
      </CoachContextProvider>
    </AppContextProvider>
  </BrowserRouter>
);
