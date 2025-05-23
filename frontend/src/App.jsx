import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import CoachRegistration from "./components/CoachRegistration";
import CoachDetails from "./components/CoachDetails";
import CoachWaitForApproval from "./components/CoachWaitForApproval";
import AllGrounds from "./components/AllGrounds";
import AddGround from "./components/AddGround";
import GroundDetails from "./components/GroundDetails";
import CoachList from "./components/CoachList";
import CoachProfile from "./components/CoachProfile";
import Login from "./pages/Login";
import ValidateGround from "./components/ValidateGround";
import Client from "./components/Client";
import ClientWaitForApproval from "./components/ClientWaitForApproval";
import Home from "./pages/Home";
import Navbar from "./pages/NavBar";
import Footer from "./pages/Footer";
import ExploreSports from "./pages/ExploreSports";
import Cricket from "./pages/Sports/Cricket";
import Football from "./pages/Sports/Football";
import Volleyball from "./pages/Sports/Volleyball";
import Netball from "./pages/Sports/Netball";
import Tennis from "./pages/Sports/Tennis";
import Badminton from "./pages/Sports/Badminton";
import Swimming from "./pages/Sports/Swimming";
import Basketball from "./pages/Sports/Basketball";
import Hockey from "./pages/Sports/Hockey";
import Verify from "./components/Verify";
import ResetPasswordSendOTP from "./components/ResetPasswordSendOTP";
import ResetPassword from "./components/ResetPassword";
import ClubPage from "./components/Club";
import CompetitionPage from "./components/Competitions";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import SportsAcademy from "./components/SportsAcademy";
import AddAcademy from "./components/AddAcademy";
import AcademyDetails from "./components/AcademyDetails";
import Profile from "./pages/Profile";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ClientAcademy from "./components/ClientAcademy";
import AcademyWaitForApproval from "./components/AcademyWaitForApproval";
import BookedItems from "./pages/BookedItems";

function App() {
  const location = useLocation();
  // const isHomePage = location.pathname === "/";

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer />
      <Navbar />

      <main className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CompetitionPage" element={<CompetitionPage />} />
          <Route path="/club" element={<ClubPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/coach-registration" element={<CoachRegistration />} />
          <Route path="/coach-details" element={<CoachDetails />} />
          <Route
            path="/coach-wait-for-approval"
            element={<CoachWaitForApproval />}
          />
          <Route path="/all-ground" element={<AllGrounds />} />
          <Route path="/add-ground" element={<AddGround />} />
          <Route path="/add-ground/:id" element={<AddGround />} />
          <Route path="/ground-details/:id" element={<GroundDetails />} />
          <Route path="/coach-list" element={<CoachList />} />
          <Route path="/coach-profile/:id" element={<CoachProfile />} />
          <Route path="/validate-ground" element={<ValidateGround />} />
          <Route path="/client/:id" element={<Client />} />
          <Route path="/client-academy/:id" element={<ClientAcademy />} />
          <Route
            path="/client-wait-for-approval"
            element={<ClientWaitForApproval />}
          />
          <Route path="/verify" element={<Verify />} />
          <Route
            path="/reset-password-send-otp"
            element={<ResetPasswordSendOTP />}
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/sports-academy" element={<SportsAcademy />} />
          <Route path="/add-academy" element={<AddAcademy />} />
          <Route path="/academy/:id" element={<AcademyDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sports" element={<ExploreSports />} />
          <Route path="/sports/cricket" element={<Cricket />} />
          <Route path="/sports/football" element={<Football />} />
          <Route path="/sports/volleyball" element={<Volleyball />} />
          <Route path="/sports/netball" element={<Netball />} />
          <Route path="/sports/tennis" element={<Tennis />} />
          <Route path="/sports/badminton" element={<Badminton />} />
          <Route path="/sports/swimming" element={<Swimming />} />
          <Route path="/sports/basketball" element={<Basketball />} />
          <Route path="/sports/hockey" element={<Hockey />} />
          <Route path="/academy-wait-for-approval" element={<AcademyWaitForApproval />} />
          <Route path="/booked-items" element={<BookedItems />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
