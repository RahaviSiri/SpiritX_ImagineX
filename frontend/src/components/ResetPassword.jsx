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
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${assets.ValidationBackround})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md p-8 bg-black bg-opacity-30 rounded-lg shadow-xl">
        {!check ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-semibold text-center text-white">Verify OTP</h2>
            <p className="text-white text-center">Check your email for the OTP</p>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-lg text-center font-medium"
            />
            <div className="flex justify-center gap-2">
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
                    className="w-12 h-12 bg-blue-600 text-white text-xl text-center rounded-md outline-none focus:ring-2 focus:ring-white"
                  />
                ))}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Verify OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <h2 className="text-2xl font-semibold text-center text-white">Reset Password</h2>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
