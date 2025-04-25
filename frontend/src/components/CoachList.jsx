import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoachContext } from "../context/Coachcontext";
import assets from "../assets/assets.js";
import { UserCog, Users, Medal } from "lucide-react";

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
    if (!coach.isApprove) return false;
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
    <div className="w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-16 px-4">
      {/* Yellow glow background center effect */}
      <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-yellow-300 opacity-10 rounded-full blur-3xl pointer-events-none z-0" />
      {/* Main */}
      <div className="w-full min-h-screen bg-black/60 p-6 rounded-xl shadow-xl">
        {/* Header */}
        <h2 className="text-3xl font-bold text-yellow-400 drop-shadow-lg mb-2 text-center">
          Find the Right Coach
        </h2>
        <p className="text-lg text-center text-gray-300 mb-10">
          Discover skilled and experienced coaches that match your needs, goals,
          and training style.
        </p>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <input
            type="text"
            placeholder="Search by City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-gray-800 border border-yellow-400 text-white px-4 py-2 rounded-full outline-none placeholder-gray-400 w-full"
          />
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="bg-gray-800 border border-yellow-400 text-white px-4 py-2 rounded-full outline-none w-full"
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
            className="bg-gray-800 border border-yellow-400 text-white px-4 py-2 rounded-full outline-none w-full"
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
            className="bg-gray-800 border border-yellow-400 text-white px-4 py-2 rounded-full outline-none w-full"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCoaches?.length === 0 ? (
            <div className="text-center col-span-full py-10 text-white">
              <h2 className="text-xl font-semibold mb-2">No coaches found</h2>
              <p className="text-gray-300">
                Try adjusting your filters or search with different criteria.
              </p>
            </div>
          ) : (
            filteredCoaches?.map((coach) => {
              const personal = coach.personalInfo || {};
              const selection = coach.coachSelection || {};

              return (
                <div
                  key={coach._id}
                  onClick={() => handleCardClick(coach._id)}
                  className="bg-gray-800 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden border border-yellow-400"
                >
                  <div className="flex flex-col items-center p-6">
                    <img
                      src={personal.profile || "/default-avatar.png"}
                      alt={personal.fullName}
                      className="w-24 h-24 rounded-full border-4 border-yellow-400 object-cover mb-3"
                    />
                    <h3 className="text-lg font-bold text-yellow-300">
                      {personal.fullName || "Unnamed Coach"}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Age: {calculateAge(personal.DOB)}
                    </p>
                    <p className="text-gray-300 text-sm">
                      Gender: {personal.gender || "N/A"}
                    </p>
                    <p className="mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                      {selection.sport} - {selection.selectionType}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="flex flex-col items-center justify-center mt-10 bg-gray-800 p-4 rounded-xl text-center">
          <p className="text-lg mb-2">Do you want to join with us ?</p>
          <button
            className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full hover:bg-yellow-500 transition"
            onClick={() => navigate("/coach-registration")}
          >
            Join with as Coach
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoachList;
