import React from 'react'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import AllGrounds from './pages/AllGrounds'
import BookedGrounds from './pages/BookedGrounds'
import { ToastContainer } from "react-toastify"

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <NavBar/>
      <Routes>
        {/* <Route path='/' element={<AllGrounds/>}/> */}
        <Route path='/all-grounds' element={<AllGrounds/>}/>
        <Route path='/booked-grounds' element={<BookedGrounds/>}/>
      </Routes>
    </div>
  )
}

export default App