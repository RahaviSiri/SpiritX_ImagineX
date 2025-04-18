import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoachContext } from "../context/Coachcontext";

const calculateAge = (dob) => {
  if (!dob) return "N/A";
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  return m < 0 || (m === 0 && today.getDate() < birthDate.getDate())
    ? age - 1
    : age;
};

const districts = [
  "Ampara",
  "Anuradhapura",
  "Badulla",
  "Batticaloa",
  "Colombo",
  "Galle",
  "Gampaha",
  "Hambantota",
  "Jaffna",
  "Kalutara",
  "Kandy",
  "Kegalle",
  "Kilinochchi",
  "Kurunegala",
  "Mannar",
  "Matale",
  "Matara",
  "Monaragala",
  "Mullaitivu",
  "Nuwara Eliya",
  "Polonnaruwa",
  "Puttalam",
  "Ratnapura",
  "Trincomalee",
  "Vavuniya",
];

const CoachList = () => {
  const { userDatas, fetchCoaches } = useContext(CoachContext);
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [selectionType, setSelectionType] = useState("");
  const [sport, setSport] = useState("");

  useEffect(() => {
    fetchCoaches();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/coach-profile/${id}`);
  };

  const filteredCoaches = userDatas?.filter((coach) => {
    const personal = coach.personalInfo || {};
    const address = coach.Address || {};
    const selection = coach.coachSelection || {};

    const cityMatch = address.city
      ?.toLowerCase()
      .startsWith(city.toLowerCase());
    const districtMatch =
      district === "" ||
      address.district?.toLowerCase() === district.toLowerCase();
    const sportMatch = sport === "" || selection.sport === sport;
    const selectionTypeMatch =
      selectionType === "" ||
      selection.selectionType === selectionType ||
      selectionType === "Any";

    return cityMatch && districtMatch && sportMatch && selectionTypeMatch;
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full"
        />
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full"
        >
          <option value="">-- Select District --</option>
          {districts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <select
          value={selectionType}
          onChange={(e) => setSelectionType(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full"
        >
          <option value="">-- Select Type --</option>
          <option value="School">School</option>
          <option value="Academics">Academics</option>
          <option value="Personal">Personal</option>
          <option value="Any">Any</option>
        </select>
        <select
          value={sport}
          onChange={(e) => setSport(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full"
        >
          <option value="">-- Select a Sport --</option>
          <option value="football">Football</option>
          <option value="basketball">Basketball</option>
          <option value="cricket">Cricket</option>
          <option value="tennis">Tennis</option>
          <option value="swimming">Swimming</option>
          <option value="badminton">Badminton</option>
        </select>
      </div>

      {/* Coaches */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCoaches?.length === 0 ? (
          <div className="text-center col-span-full py-10">
            <div className="text-5xl mb-4">😕</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No coaches found
            </h2>
            <p className="text-gray-500">
              Try adjusting your filters or search with different criteria.
            </p>
          </div>
        ) : (
          filteredCoaches?.map((coach) => {
            const personal = coach.personalInfo || {};
            const address = coach.Address || {};
            const selection = coach.coachSelection || {};

            return (
              <div
                key={coach._id}
                onClick={() => handleCardClick(coach._id)}
                className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition-all cursor-pointer flex flex-col items-center text-center"
              >
                <img
                  src={personal.profile || "/default-avatar.png"}
                  alt={personal.fullName}
                  className="w-24 h-24 rounded-full mb-3 border-4 border-blue-500"
                />
                <h3 className="text-lg font-bold text-gray-800">
                  {personal.fullName || "Unnamed Coach"}
                </h3>
                <p className="text-gray-600">
                  Age: {calculateAge(personal.DOB)}
                </p>
                <p className="text-gray-600">
                  Gender: {personal.gender || "N/A"}
                </p>
                <p className="text-gray-600">
                  {selection.sport} - {selection.selectionType}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CoachList;
