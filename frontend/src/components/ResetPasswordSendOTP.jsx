import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';
import assets from '../assets/assets';

const ResetPasswordSendOTP = () => {
  axios.defaults.withCredentials = true;
  const [email, setEmail] = useState("");
  const { backendURL } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: response } = await axios.post(`${backendURL}/api/user/send-reset-otp`, { email });
      if (response.success) {
        localStorage.setItem('email', response.email);
        toast.success(response.message);
        navigate('/reset-password');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-16 px-4 relative">
      {/* Yellow glow effect */}
      <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-yellow-300 opacity-10 rounded-full blur-3xl pointer-events-none z-0" />
      
      <div className="flex items-center justify-center min-h-screen z-10 relative">
        <div className="w-full max-w-md p-8 bg-black/60 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-yellow-400 mb-4 drop-shadow">Reset Password</h2>
          <p className="text-lg text-center text-gray-300 mb-6">Enter your registered email</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">Your Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-yellow-400 bg-gray-800 text-white p-4 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                placeholder="Enter your email"
              />
            </div>
  
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-full hover:bg-yellow-500 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default ResetPasswordSendOTP;
