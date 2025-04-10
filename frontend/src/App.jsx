import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import Registration from './coach/registration';
import { Routes , Route} from 'react-router-dom';

function App() {
  

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/coach-registration' element={<Registration />}/>
      </Routes>
    </div>
    
  )
}

export default App
