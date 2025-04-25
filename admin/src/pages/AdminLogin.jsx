import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/admin/check-admin-login', {
        email,
        password,
      });

      if (data.success) {
        toast.success("Welcome Admin!");
        navigate("/admin-dashboard");
        setEmail("");
        setPassword("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-b from-black via-gray-900 to-black text-white pt-8 px-4 relative">
      {/* Yellow glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-yellow-300 opacity-10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main Container */}
      <div className="min-h-screen w-full flex items-center justify-center relative z-10">
        <div className="w-full max-w-md px-8 py-10 bg-gray-800 bg-opacity-80 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold text-yellow-400 text-center mb-2">Admin Login</h2>
          <p className="text-base text-center text-gray-300 mb-8">Manage SportsHive with Power</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                id="email"
                type="email"
                required
                className="w-full bg-gray-900 border border-yellow-400 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input
                id="password"
                type="password"
                required
                className="w-full bg-gray-900 border border-yellow-400 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-full hover:bg-yellow-500 transition duration-300 mt-4"
            >
              Login as Admin
            </button>
          </form>

          <p className="text-sm text-center text-gray-400 mt-6">
            Forgot Password?{" "}
            <span
              onClick={() => navigate('/admin/reset-password-send-otp')}
              className="text-yellow-400 cursor-pointer hover:underline"
            >
              Click here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
