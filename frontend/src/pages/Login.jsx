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
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${assets.ValidationBackround})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {state === "Sign Up" ? (
        <div className="w-full max-w-md p-8 bg-black bg-opacity-30 rounded-lg shadow-xl">
          <p className="text-3xl font-semibold text-center text-white mb-4">Create Account</p>
          <p className="text-lg text-center text-white mb-6">Grow your Sports Life</p>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-white">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-white">Your email</label>
                <input
                  id="email"
                  type="email"
                  required
                  className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium text-white">Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 mt-6 rounded-lg font-semibold hover:bg-blue-500 transition duration-300"
            >
              Create Account
            </button>
          </form>
          <p className="text-sm text-center text-white mt-4">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
          
        </div>
      ) : (
        <div className="w-full max-w-md p-8 bg-black bg-opacity-30 rounded-lg shadow-xl">
          <p className="text-3xl font-semibold text-center text-white mb-4">Login</p>
          <p className="text-lg text-center text-white mb-6">Login to get more benefits</p>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-white">Enter email</label>
                <input
                  id="email"
                  type="email"
                  required
                  className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium text-white">Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 mt-6 rounded-lg font-semibold hover:bg-blue-500 transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-center text-white mt-6">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-500 cursor-pointer hover:underline "
            >
              SignUp here
            </span>
          </p>
          <p className="text-sm text-center text-white mt-4">
            Forgot Password?{" "}
            <span
              onClick={() => navigate('/reset-password-send-otp')}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Click here
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;