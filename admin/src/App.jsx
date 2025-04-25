import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Coach from "./pages/Coach";
import NavBar from './components/NavBar';
import AllGrounds from './pages/AllGrounds';
import BookedGrounds from './pages/BookedGrounds';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from "./pages/adminDashboard";
import AdminLogin from "./pages/AdminLogin";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
      <NavBar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>          

          <Route path="/coach" element={<Coach />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/all-grounds" element={<AllGrounds />} />
          <Route path="/booked-grounds" element={<BookedGrounds />} />
          <Route path="/" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
