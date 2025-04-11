import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CoachWaitForApproval = () => {
  const inputRefs = React.useRef([]);
  const [email, setEmail] = React.useState("");
  const [check, setCheck] = React.useState(false);
  const backend_url = "https://your-backend-url.com"; // Replace this with your actual backend URL

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
      };
      const { data: response } = await axios.post(
        `${backend_url}/api/user/check-reset-otp`,
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-2 text-blue-700">
          Waiting for Admin Approval
        </h1>
        <p className="text-center text-gray-600 mb-6">
          If you've been approved, enter the OTP sent to your email to continue.
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
      </div>
    </div>
  );
};

export default CoachWaitForApproval;
