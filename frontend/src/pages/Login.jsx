import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets.js";
import { UserContext } from "../context/UserContext.jsx";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { backendURL, setUToken } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendURL + "/api/user/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("uToken", data.token);
          setUToken(data.token);
          navigate("/");
          setName("");
          setEmail("");
          setPassword("");
        } else {
          toast.error(data.message);
          setName("");
          setEmail("");
          setPassword("");
        }
      } else {
        const { data } = await axios.post(backendURL + "/api/user/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("uToken", data.token);
          setUToken(data.token);
          navigate("/");
          setEmail("");
          setPassword("");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-16 px-4 relative"
      style={{ backgroundImage: `url(${assets.LoginBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Yellow glow background effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-yellow-300 opacity-10 rounded-full blur-3xl pointer-events-none z-0" />
  
      {/* Main Container */}
      <div className="w-full h-screen bg-black/0 p-6 rounded-xl shadow-xl flex items-center justify-center relative z-10">
        {state === "Sign Up" ? (
          <div className="w-full max-w-md p-8 bg-black bg-opacity-60 rounded-2xl shadow-2xl mt">
            <h2 className="text-3xl font-bold text-yellow-400 text-center mb-4">Create Account</h2>
            <p className="text-lg text-center text-gray-300 mb-8">Grow your Sports Life</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  className="bg-transparent border border-yellow-400 text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  className="bg-transparent border border-yellow-400 text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  className="bg-transparent border border-yellow-400 text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-full hover:bg-yellow-500 transition duration-300 mt-6"
              >
                Create Account
              </button>
            </form>
            <p className="text-sm text-center text-gray-400 mt-6">
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-yellow-400 cursor-pointer hover:underline"
              >
                Login here
              </span>
            </p>
          </div>
        ) : (
          <div className="w-full max-w-md p-8 bg-black bg-opacity-60 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold text-yellow-400 text-center mb-4">Login</h2>
            <p className="text-lg text-center text-gray-300 mb-8">Login to get more benefits</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  className="bg-transparent border border-yellow-400 text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  className="bg-transparent border border-yellow-400 text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-full hover:bg-yellow-500 transition duration-300 mt-6"
              >
                Login
              </button>
            </form>
            <p className="text-sm text-center text-gray-400 mt-6">
              Don't have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-yellow-400 cursor-pointer hover:underline"
              >
                Sign Up here
              </span>
            </p>
            <p className="text-sm text-center text-gray-400 mt-4">
              Forgot Password?{" "}
              <span
                onClick={() => navigate('/reset-password-send-otp')}
                className="text-yellow-400 cursor-pointer hover:underline"
              >
                Click here
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
