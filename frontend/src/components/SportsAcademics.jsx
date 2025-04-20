import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const academies = [
  {
    id: 1,
    name: "Elite Soccer Academy",
    shortDesc: "High-performance football training.",
    location: "London, UK",
    mode: "Physical",
    price: "Paid",
  },
  {
    id: 2,
    name: "Virtual Tennis Pro",
    shortDesc: "Online coaching for all levels.",
    location: "Online",
    mode: "Online",
    price: "Free",
  },
  // Add more as needed...
];

const SportsAcademies = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Sports Academies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {academies.map((academy) => (
          <div
            key={academy.id}
            className="bg-white shadow-md rounded-2xl p-4 cursor-pointer hover:shadow-xl transition-all"
            onClick={() =>
              setSelectedCard(selectedCard === academy.id ? null : academy.id)
            }
          >
            <h2 className="text-xl font-semibold">{academy.name}</h2>
            <p className="text-gray-600">{academy.shortDesc}</p>
            {selectedCard === academy.id && (
              <div className="mt-4 text-sm text-gray-700 space-y-1">
                <p><strong>Location:</strong> {academy.location}</p>
                <p><strong>Mode:</strong> {academy.mode}</p>
                <p><strong>Cost:</strong> {academy.price}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fixed Apply Button */}
      <button
        onClick={() => navigate("/apply")}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all"
      >
        Apply for Listing
      </button>
    </div>
  );
};

export default SportsAcademies;
