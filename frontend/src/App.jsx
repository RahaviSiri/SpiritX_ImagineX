import { ToastContainer} from 'react-toastify';
import { Routes , Route} from 'react-router-dom';
import CoachRegistration from './pages/CoachRegistration';
import CoachDetails from './pages/CoachDetails';
import CoachWaitForApproval from './pages/CoachWaitForApproval';

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
