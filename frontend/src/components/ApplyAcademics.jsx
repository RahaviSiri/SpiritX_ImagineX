import React, { useState } from "react";

const ApplyAcademics = () => {
  const [formData, setFormData] = useState({
    name: "",
    proof: null,
    certificate: null,
    paymentRef: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting application with:", formData);
    alert("Application submitted!");
  };

  return (
    <div className="min-h-screen p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6">Apply to List Your Academy</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-xl mx-auto"
        encType="multipart/form-data"
      >
        <div>
          <label className="block font-medium mb-1">Academy Name</label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Upload Proof</label>
          <input
            name="proof"
            type="file"
            accept="image/*,.pdf"
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Upload Certificate</label>
          <input
            name="certificate"
            type="file"
            accept="image/*,.pdf"
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Payment Reference ID</label>
          <input
            name="paymentRef"
            type="text"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ApplyAcademics;
