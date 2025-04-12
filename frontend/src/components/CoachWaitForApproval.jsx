import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CoachContext } from "../context/Coachcontext";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const CoachWaitForApproval = () => {
  const inputRefs = React.useRef([]);
  const [email, setEmail] = useState("");
  const { backend_url, userData } = useContext(CoachContext);
  const navigate = useNavigate();

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
      const data = {
        email: email,
        otp: otp,
        userId: userData._id,
      };
      console.log(data);
      const token = localStorage.getItem("token");
      const { data: response } = await axios.post(
        `${backend_url}/api/coach/check-otp`,
        data,

        {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-2 text-blue-700">
          Waiting for Admin Approval
        </h1>

        {userData?.isApprove}
        {userData?.isApprove ? (
          <>
            <p className="text-center text-gray-600 mb-6">
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
                className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-10 h-12 text-center text-xl border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ))}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Continue
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center space-y-2 py-4">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-blue-700 font-medium">
                Loading, please wait...
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CoachWaitForApproval;
