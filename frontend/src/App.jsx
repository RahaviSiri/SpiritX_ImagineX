import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';

import { Routes , Route} from 'react-router-dom';
import CoachRegistration from './components/CoachRegistration';
import CoachDetails from './components/CoachDetails';
import CoachWaitForApproval from './components/CoachWaitForApproval';
import Verify from './components/Verify';


function App() {
  

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/coach-registration' element={<CoachRegistration />} />
        <Route path='/coach-details' element={<CoachDetails />} />
        <Route path='/coach-wait-for-approval' element={<CoachWaitForApproval />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
    </div>
    
  )
}

export default App
