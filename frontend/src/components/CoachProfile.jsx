import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CoachContext } from "../context/Coachcontext";

const CoachProfile = () => {
  const { id } = useParams();
  // console.log(id)
  const [coach, setCoach] = useState(null);
  const {SelectedCoachId,setSelectedCoachId,backend_url} = useContext(CoachContext);

  
  const handleCardClick = (id) => {
    // navigate(`/coach/${id}`);
  };

  useEffect(() => {
    const fetchCoach = async () => {
      try {
        const { data } = await axios.get(
          `${backend_url}/api/coach/getCoachById/${id}`,
          {
            withCredentials: true,
          }
        );
        console.log(data)
        if (data.success) {
          setCoach(data.coach);
        }
      } catch (error) {
        console.log(error)
        console.error("Error fetching coach details:", error.message);
      }
    };

    fetchCoach();
  }, [id]);
  // In your React component
useEffect(() => {
  // Validate ID before making the API call
  if (!id || id === 'undefined') {
    console.error("Invalid coach ID");
    // setError("Invalid coach ID");
    return;
  }
  
  
  
  
}, [id]);

  if (!coach) return <p className="text-center mt-10">Loading...</p>;

  const personal = coach.personalInfo || {};
  const address = coach.Address || {};
  const selection = coach.coachSelection || {};

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <div
        key={coach._id}
        onClick={() => handleCardClick(coach._id)}
        className="flex items-center space-x-4 bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 p-4 cursor-pointer"
      >
        <img
          src={personal?.profile || "/default-avatar.png"}
          alt={personal?.fullName}
          className="w-28 h-28 rounded-full border-4 border-blue-500"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {personal?.fullName}
          </h2>
          <p className="text-gray-600">
            {selection?.sport} - {selection?.selectionType}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">Email:</span> {personal?.email}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {personal?.phone}
        </p>
        <p>
          <span className="font-semibold">Gender:</span> {personal?.gender}
        </p>
        <p>
          <span className="font-semibold">City:</span> {address?.city}
        </p>
        <p>
          <span className="font-semibold">District:</span> {address?.district}
        </p>
        <p>
          <span className="font-semibold">Province:</span> {address?.province}
        </p>
      </div>
    </div>
  );
};

export default CoachProfile;
