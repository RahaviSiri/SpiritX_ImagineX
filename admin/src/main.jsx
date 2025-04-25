import React from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CoachContextProvider } from "./context/CoachContext.jsx";
import { AcademyContextProvider } from "./context/AcademyContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CoachContextProvider>
      <AcademyContextProvider>
        <App />
      </AcademyContextProvider>
    </CoachContextProvider>
  </BrowserRouter>
);

