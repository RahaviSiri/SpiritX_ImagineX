import React from 'react';

const Client = () => {
  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-3xl shadow-md">
      <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        Book a Coach - Client Details
      </h1>

      <form className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Contact Number</label>
          <input
            type="tel"
            placeholder="Enter your contact number"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Address Line 1</label>
          <input
            type="text"
            placeholder="Street address"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Address Line 2 (Optional)</label>
          <input
            type="text"
            placeholder="Apartment, suite, etc."
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              placeholder="City"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">District</label>
            <input
              type="text"
              placeholder="District"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Preferred Date & Time</label>
          <input
            type="datetime-local"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
          <textarea
            rows="3"
            placeholder="Mention any preferences or goals"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition duration-300"
        >
          Submit Booking Request
        </button>
      </form>
    </div>
  );
};

export default Client;
