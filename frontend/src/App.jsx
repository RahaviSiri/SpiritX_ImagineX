import { ToastContainer} from 'react-toastify';
import { Routes , Route} from 'react-router-dom';
import CoachRegistration from './components/CoachRegistration';
import CoachDetails from './components/CoachDetails';
import CoachWaitForApproval from './components/CoachWaitForApproval';
import AllGrounds from './components/AllGrounds';
import AddGround from './components/AddGround';
import GroundDetails from './components/GroundDetails';
import CoachList from './components/CoachList';
import CoachProfile from './components/CoachProfile';
import ValidateGround from './components/validateGround';


function App() {
  return (
    <div className='min-h-screen'>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<AddGround/>} />
        <Route path='/coach-registration' element={<CoachRegistration />} />
        <Route path='/coach-details' element={<CoachDetails />} />
        <Route path='/coach-wait-for-approval' element={<CoachWaitForApproval />} />
        <Route path='/all-ground' element={<AllGrounds />} />
        <Route path='/add-ground' element={<AddGround />} />
        <Route path='/add-ground/:id' element={<AddGround />} />
        <Route path='/ground-details/:id' element={<GroundDetails />} />
        <Route path='/coach-list' element={<CoachList />} />
        <Route path='/coach-profile/:id' element={<CoachProfile />} />
        <Route path='/validate-ground' element={< ValidateGround/>} />
      </Routes>
    </div>
    
  )
}

export default App
