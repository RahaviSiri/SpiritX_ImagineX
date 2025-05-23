import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { UserContext } from "../context/UserContext";
import assets from "../assets/assets"; // assuming you have a background image here

const ClientWaitForApproval = () => {
  const inputRefs = React.useRef([]);
  const { backendURL, userData, uToken } = useContext(UserContext);
  const navigate = useNavigate();

  const coachBooking = userData?.coachBooking;
  const lastBooking =
    Array.isArray(coachBooking) && coachBooking.length > 0
      ? coachBooking[coachBooking.length - 1]
      : null;

  const [email, setEmail] = useState(lastBooking?.email || "");

  useEffect(() => {
    if (!lastBooking) {
      console.warn("No booking found");
    }
  }, [lastBooking]);

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
      const bookingId = lastBooking?._id;
      const otp = inputRefs.current.map((el) => el.value).join("");

      const data = {
        bookingId,
        email,
        otp,
      };

      const { data: response } = await axios.post(
        `${backendURL}/api/user/check-otp-by-user`,
        data,
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.success && response.session_url) {
        window.location.replace(response.session_url);
        toast.success(response.message);
      } else {
        toast.error(response.message || "Failed to create payment session");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${assets.coach2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-black/50 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md w-full font-sans">
        <h1 className="text-2xl font-bold text-center mb-4 text-yellow-400">
          Waiting for Admin Approval
        </h1>
  
        {lastBooking?.isApprove ? (
          <>
            <p className="text-center text-white mb-6">
              If you've been approved, enter the OTP sent to your email to
              continue.
            </p>
  
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                required
                className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white/80 text-black"
              />
  
              <div className="flex justify-center gap-2 mb-6">
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      required
                      ref={(el) => (inputRefs.current[index] = el)}
                      onInput={(e) => handleLength(e, index)}
                      onKeyDown={(e) => handleLockDown(e, index)}
                      onPaste={handlePaste}
                      className="w-10 h-12 text-center text-xl border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white/80 text-black"
                    />
                  ))}
              </div>
  
              <button
                type="submit"
                className="w-full bg-yellow-500 text-black py-2 rounded-md hover:bg-yellow-600 transition"
              >
                Continue
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 py-6">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-white font-medium">
              Loading, please wait...
            </p>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default ClientWaitForApproval;
