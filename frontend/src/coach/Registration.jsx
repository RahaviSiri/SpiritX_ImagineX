import React from "react";
import { UploadCloud } from "lucide-react";

const Registration = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 font-sans">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <form>
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Register to Become a Coach
          </h1>
          <p className="text-sm text-gray-600 text-center mb-6">
            Please note: Fields marked with an asterisk (*) are required.
          </p>

          {/* Personal Info */}
          <div className="space-y-4 border border-gray-400 m-2 p-4">
            <p className="text-lg font-semibold text-gray-800 border-b pb-1">
              Personal Info:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name*"
                className="input-style border border-gray-300 p-2 rounded-md"
                required
              />
              <label className="flex items-center gap-2 text-blue-600 hover:underline cursor-pointer text-sm font-medium border border-dashed border-blue-400 p-2 rounded-md">
                <UploadCloud size={16} /> Upload profile photo*
                <input type="file" id="photo" hidden required />
              </label>

              <input
                type="date"
                placeholder="Date of Birth*"
                className="input-style border border-gray-300 p-2 rounded-md"
              />
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700" required>Gender*:</span>
                <label className="inline-flex items-center space-x-2 text-gray-700">
                  <input type="radio" name="gender" className="form-radio text-blue-500" />
                  <span>Male</span>
                </label>
                <label className="inline-flex items-center space-x-2 text-gray-700">
                  <input type="radio" name="gender" className="form-radio text-blue-500" />
                  <span>Female</span>
                </label>
              </div>

              <input
                type="text"
                required
                placeholder="NIC No*"
                className="input-style border border-gray-300 p-2 rounded-md"
              />
              <label className="flex items-center gap-2 text-blue-600 hover:underline cursor-pointer text-sm font-medium border border-dashed border-blue-400 p-2 rounded-md">
                <UploadCloud size={16} /> Upload NIC frontpage*
                <input required type="file" id="NIC" hidden />
              </label>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 border border-gray-400 m-2 p-4">
            <p className="text-lg font-semibold text-gray-800 border-b pb-1">
              Contact Details:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="tel" placeholder="Contact No*" className="input-style border border-gray-300 p-2 rounded-md" required/>
              <input type="tel" placeholder="Home Telephone No" className="input-style border border-gray-300 p-2 rounded-md"  />
              <input type="tel" placeholder="WhatsApp No*" className="input-style border border-gray-300 p-2 rounded-md" required/>
              <input type="email" placeholder="Email Address*" className="input-style border border-gray-300 p-2 rounded-md" required/>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4 border border-gray-400 m-2 p-4">
            <p className="text-lg font-semibold text-gray-800 border-b pb-1">
              Address:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Line 1*" className="input-style border border-gray-300 p-2 rounded-md" required/>
              <input type="text" placeholder="Line 2" className="input-style border border-gray-300 p-2 rounded-md" />
              <input type="text" placeholder="City*" className="input-style border border-gray-300 p-2 rounded-md" required/>
              <input type="text" placeholder="District*" className="input-style border border-gray-300 p-2 rounded-md" required />
            </div>
          </div>

          {/* Coach Selection */}
          <div className="space-y-4 border border-gray-400 m-2 p-4">
            <p className="text-lg font-semibold text-gray-800 border-b pb-1">
              Coach Selection Details:
            </p>

            <div className="text-sm text-gray-700 mb-2"></div>
            <div className="flex flex-wrap gap-4">
                Select type* :
              {["School", "Academics", "Personal", "Any"].map((type) => (
                <label key={type} className="inline-flex items-center space-x-2 text-gray-700">
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    className="form-radio text-blue-500"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select className="input-style border border-gray-300 p-2 rounded-md">
                <option value="">-- Select a School --</option>
                <option value="engineering">School of Engineering</option>
                <option value="business">School of Business</option>
                <option value="arts">School of Arts & Humanities</option>
                <option value="science">School of Science</option>
                <option value="law">School of Law</option>
                <option value="medicine">School of Medicine</option>
              </select>
              <select className="input-style border border-gray-300 p-2 rounded-md">
                <option value="">-- Select a Sport --</option>
                <option value="football">Football</option>
                <option value="basketball">Basketball</option>
                <option value="cricket">Cricket</option>
                <option value="tennis">Tennis</option>
                <option value="swimming">Swimming</option>
                <option value="badminton">Badminton</option>
              </select>
            </div>

            <textarea
              placeholder="Academic Qualifications"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            ></textarea>

            <label className="flex items-center gap-2 text-blue-600 hover:underline cursor-pointer text-sm font-medium border border-dashed border-blue-400 p-2 rounded-md">
              <UploadCloud size={16} /> Upload qualifications evidence*
              <input type="file" id="evidence" hidden />
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl transition"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
