import { ToastContainer} from 'react-toastify';
import { Routes , Route} from 'react-router-dom';
import CoachRegistration from './components/CoachRegistration';
import CoachDetails from './components/CoachDetails';
import CoachWaitForApproval from './components/CoachWaitForApproval';


function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/coach-registration' element={<CoachRegistration />} />
        <Route path='/coach-details' element={<CoachDetails />} />
        <Route path='/coach-wait-for-approval' element={<CoachWaitForApproval />} />
      </Routes>
    </div>
    
  )
}

export default App
