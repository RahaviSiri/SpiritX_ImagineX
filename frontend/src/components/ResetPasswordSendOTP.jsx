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
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${assets.ValidationBackround})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md p-8 bg-black bg-opacity-30 rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-white mb-4">Reset Password</h2>
        <p className="text-lg text-center text-white mb-6">Enter your registered email</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-white">Your Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-500 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordSendOTP;
