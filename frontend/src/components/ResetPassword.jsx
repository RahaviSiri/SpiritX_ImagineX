import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import assets from "../assets/assets.js"; // assuming for background

const ResetPassword = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const { backendURL } = useContext(UserContext);
  const [check, setCheck] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const inputRefs = React.useRef([]);

  const handleLength = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleLockDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && e.target.value === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const OTPArray = inputRefs.current.map((e) => e.value);
      const otp = OTPArray.join("");
      const data = { email, otp };

      const { data: response } = await axios.post(
        `${backendURL}/api/user/check-reset-otp`,
        data,
        { withCredentials: true }
      );

      if (response.success) {
        setCheck(true);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email,
        newPassword,
        confirmNewPassword,
      };

      const { data: response } = await axios.post(
        `${backendURL}/api/user/reset-password`,
        data
      );

      if (response.success) {
        navigate("/login");
        toast.success(response.message);
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
      
      <div className="w-full flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 bg-black/60 rounded-2xl shadow-2xl z-10">
          {!check ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-3xl font-bold text-center text-yellow-400 drop-shadow mb-2">Verify OTP</h2>
              <p className="text-gray-300 text-center mb-6">Check your email for the OTP</p>
  
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-2 bg-gray-800 text-gray-400 rounded-full text-center font-medium mb-4"
              />
  
              <div className="flex justify-center gap-2 mb-4">
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      ref={(e) => (inputRefs.current[index] = e)}
                      onInput={(e) => handleLength(e, index)}
                      onKeyDown={(e) => handleLockDown(e, index)}
                      onPaste={handlePaste}
                      required
                      className="w-12 h-12 bg-yellow-100 text-black text-xl text-center rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  ))}
              </div>
  
              <button
                type="submit"
                className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-full hover:bg-yellow-500 transition duration-300"
              >
                Verify OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <h2 className="text-3xl font-bold text-center text-yellow-400 drop-shadow mb-6">Reset Password</h2>
  
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-300">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border border-yellow-400 bg-gray-800 p-4 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
  
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-300">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="border border-yellow-400 bg-gray-800 p-4 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
  
              <button
                type="submit"
                className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-full hover:bg-yellow-500 transition duration-300"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default ResetPassword;
