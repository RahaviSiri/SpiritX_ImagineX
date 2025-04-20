import React from "react";
import { Route, Routes } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import Coach from "./components/Coach";
import NavBar from './components/NavBar'
import AllGrounds from './pages/AllGrounds'
import BookedGrounds from './pages/BookedGrounds'

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <NavBar/>
      <Routes>
        <Route path="/coach" element={<Coach />} />
        <Route path='/all-grounds' element={<AllGrounds/>}/>
        <Route path='/booked-grounds' element={<BookedGrounds/>}/>
      </Routes>
    </div>
  )
}

export default App