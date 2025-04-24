import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import CoachRegistration from './components/CoachRegistration';
import CoachDetails from './components/CoachDetails';
import CoachWaitForApproval from './components/CoachWaitForApproval';
import AllGrounds from './components/AllGrounds';
import AddGround from './components/AddGround';
import GroundDetails from './components/GroundDetails';
import CoachList from './components/CoachList';
import CoachProfile from './components/CoachProfile';
import ValidateGround from './components/validateGround';
import Login from './pages/Login';
import Client from './components/Client';
import ClientWaitForApproval from './components/ClientWaitForApproval';
import Home from './pages/Home';
import Navbar from './pages/NavBar';
import Footer from './pages/Footer'; 
import ExploreSports from './pages/ExploreSports'; 
import Cricket from './pages/Sports/Cricket';
import Football from './pages/Sports/Football';
import Volleyball from './pages/Sports/Volleyball';
import Netball from './pages/Sports/Netball';

function App() {
  return (
    <div className='min-h-screen flex flex-col'>
      <ToastContainer />
      <Navbar />
      <div className="flex-grow"> 
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/coach-registration' element={<CoachRegistration />} />
          <Route path='/coach-details' element={<CoachDetails />} />
          <Route path='/coach-wait-for-approval' element={<CoachWaitForApproval />} />
          <Route path='/all-ground' element={<AllGrounds />} />
          <Route path='/add-ground' element={<AddGround />} />
          <Route path='/add-ground/:id' element={<AddGround />} />
          <Route path='/ground-details/:id' element={<GroundDetails />} />
          <Route path='/coach-list' element={<CoachList />} />
          <Route path='/coach-profile/:id' element={<CoachProfile />} />
          <Route path='/validate-ground' element={<ValidateGround />} />
          <Route path='/client/:id' element={<Client />} />
          <Route path='/client-wait-for-approval' element={<ClientWaitForApproval />} />
          <Route path="/sports" element={<ExploreSports />} />
          <Route path="/sports/cricket" element={<Cricket />} />
          <Route path="/sports/football" element={<Football />} />
          <Route path="/sports/volleyball" element={<Volleyball />} />
          <Route path="/sports/netball" element={<Netball />} />
        </Routes>
      </div>
      <Footer /> 
    </div>
  );
}

export default App;
