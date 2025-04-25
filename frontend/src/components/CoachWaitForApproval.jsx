import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CoachContext } from "../context/Coachcontext";
import assets from "../assets/assets.js";
// import { UserContext } from "../context/UserContext.jsx";

const CoachWaitForApproval = () => {
  const inputRefs = React.useRef([]);
  const [email, setEmail] = useState("");
  const { backend_url, coachData, fetchCoach, fetchCoaches } =
    useContext(CoachContext);
  // const { userData } = useContext(UserContext);

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
      const OTPArray = inputRefs.current.map((el) => el.value);
      const otp = OTPArray.join("");
      const id = coachData._id;
      console.log(id);
      console.log(otp,email);

      const Ctoken = localStorage.getItem("Ctoken");
      console.log(Ctoken);
      const { data } = await axios.post(
        `${backend_url}/api/coach/check-otp`,
        { email, otp, id },
      );

      if (data.success && data.session_url) {
        window.location.replace(data.session_url);
        // toast.success(data.message);
      } else {
        toast.error(data.message || "Failed to create payment session");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center px-4 relative">
      {/* Yellow glow background center effect */}
      <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-yellow-300 opacity-10 rounded-full blur-3xl pointer-events-none z-0" />
  
      <div className="bg-black/60 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md w-full relative z-10 mt-20">
        <h1 className="text-2xl font-bold text-center mb-4 text-yellow-400 drop-shadow-lg">
          Waiting for Admin Approval
        </h1>
  
        {coachData?.isApprove ? (
          <>
            <p className="text-center text-gray-300 mb-6">
              If you've been approved, enter the OTP sent to your email to continue.
            </p>
  
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                required
                className="w-full mb-4 px-4 py-2 border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-800 text-white placeholder-gray-400"
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
                      className="w-10 h-12 text-center text-xl border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-800 text-white"
                    />
                  ))}
              </div>
  
              <button
                type="submit"
                className="w-full bg-yellow-400 text-black py-2 rounded-md hover:bg-yellow-500 transition font-semibold"
              >
                Continue
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 py-6">
            <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-300 font-medium">
              Loading, please wait...
            </p>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default CoachWaitForApproval;
