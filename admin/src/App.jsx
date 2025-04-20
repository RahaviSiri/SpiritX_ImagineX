import React from "react";
import { Route, Routes } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import Coach from "./components/Coach";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/coach" element={<Coach />} />
      </Routes>
    </div>
  );
};

export default App;
