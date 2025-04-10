import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';

import { Routes , Route} from 'react-router-dom';
import CoachRegistration from './pages/CoachRegistration';
import CoachDetails from './pages/CoachDetails';

function App() {
  

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/coach-registration' element={<CoachRegistration />} />
        <Route path='/coach-details' element={<CoachDetails />} />
      </Routes>
    </div>
    
  )
}

export default App
