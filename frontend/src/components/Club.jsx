import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";
import axios from "axios";
import { toast } from "react-toastify";
import bgImage from "../assets/clubbg.jpg";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

// Setup Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function ClubPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [showAddClubForm, setShowAddClubForm] = useState(false);
  const [newClub, setNewClub] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    description: "",
    locationLink: "",
    competitions: "",
    img: null,
  });
  const [submissionStatus, setSubmissionStatus] = useState("");
  const { uToken } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/clubs/getClub"
        );
        setClubs(response.data);
        setFilteredClubs(response.data);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };
    fetchClubs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.toLowerCase();
    const filtered = clubs.filter(
      (club) =>
        club.name.toLowerCase().includes(term) ||
        club.description.toLowerCase().includes(term) ||
        club.city.toLowerCase().includes(term)
    );
    setFilteredClubs(filtered);
    setSelectedClub(null);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilteredClubs(clubs);
    setSelectedClub(null);
  };

  function MapClickHandler() {
    useMapEvents({ click: () => setSelectedClub(null) });
    return null;
  }

  const handleNewClubChange = (e) => {
    setNewClub({ ...newClub, [e.target.name]: e.target.value });
  };

  const extractLatLngFromLink = async (link) => {
    try {
      let finalLink = link;
  
      const isShortLink = /(goo\.gl|maps\.app\.goo\.gl)/.test(link);
if (isShortLink) {
  const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/utils', { url: link });
  finalLink = response.data.finalUrl;
}

  
      const match = finalLink.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (match) {
        return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
      }
  
      console.warn("Couldn't extract coordinates, using default.");
      return { lat: 7.0, lng: 80.0 };
    } catch (err) {
      console.error("Error resolving link:", err.message);
      return { lat: 7.0, lng: 80.0 };
    }
  };

  
  

  const handleAddClubSubmit = async (e) => {
    e.preventDefault();
    
    const location = await extractLatLngFromLink(newClub.locationLink);

    //const location = extractLatLngFromLink(newClub.locationLink);
    const competitions = newClub.competitions.split(",").map((c) => c.trim());

    const formData = new FormData();
    formData.append("name", newClub.name);
    formData.append("email", newClub.email);
    formData.append("phone", newClub.phone);
    formData.append("city", newClub.city);
    formData.append("description", newClub.description);
    formData.append("location[lat]", location.lat);
    formData.append("location[lng]", location.lng);
    competitions.forEach((comp, index) =>
      formData.append(`competitions[${index}]`, comp)
    );
    formData.append("img", newClub.img); // Image file

    try {
      const response = await axios.post(
        "http://localhost:3000/api/clubs/addClub",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      const updatedClubs = [...clubs, response.data];
      setClubs(updatedClubs);
      setFilteredClubs(updatedClubs);
      setNewClub({
        name: "",
        email: "",
        phone: "",
        city: "",
        description: "",
        locationLink: "",
        competitions: "",
        img: null,
      });
      setShowAddClubForm(false);

      toast.success("Club added successfully!");
    } catch (error) {
      console.error("Error adding club:", error);
      toast.error("Failed to add club. Please try again.");
    }
  };

  const handleCancel = () => {
    setShowAddClubForm(false);
    setNewClub({
      name: "",
      email: "",
      phone: "",
      city: "",
      description: "",
      locationLink: "",
      competitions: "",
      img: null,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewClub((prevState) => ({ ...prevState, img: file }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-20 px-4 relative">
      {/* Yellow glowing circle in background */}
      <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-yellow-300 opacity-10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto bg-black/60 p-6 sm:p-10 rounded-3xl shadow-xl border border-yellow-400">
        <h1 className="text-xl sm:text-3xl font-extrabold text-center mb-8 text-yellow-400 drop-shadow-lg">
           Explore Clubs Near You
        </h1>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row justify-center items-center mb-10 gap-4"
        >
          <input
            type="text"
            placeholder="Search for clubs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 border border-yellow-400 text-white px-4 py-2 rounded-full outline-none placeholder-gray-400 w-full sm:w-72"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-full shadow"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-full shadow"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Map */}
        <div className="relative h-[400px] sm:h-[500px] w-full mb-6 rounded-2xl overflow-hidden shadow-xl">
          <MapContainer
            center={[7.0, 80.0]}
            zoom={7}
            scrollWheelZoom
            className="h-full w-full z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredClubs.map((club, idx) => {
              const location = club.location || { lat: 7.0, lng: 80.0 };
              return (
                <Marker
                  key={idx}
                  position={[location.lat, location.lng]}
                  eventHandlers={{ click: () => setSelectedClub(club) }}
                />
              );
            })}
            <MapClickHandler />
          </MapContainer>

          {selectedClub && (
            <div className="absolute top-4 right-4 bg-black/80 border border-yellow-400 rounded-xl p-5 w-full sm:w-96 z-[1000] shadow-lg">
              <div className="flex items-center mb-4">
                <img
                  src={selectedClub.img}
                  alt={selectedClub.name}
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-yellow-400"
                />
                <div>
                  <h2 className="text-xl font-bold text-yellow-300">
                    {selectedClub.name}
                  </h2>
                  <p className="text-sm text-gray-300">{selectedClub.city}</p>
                  <p className="text-sm text-blue-400">{selectedClub.email}</p>
                  <p className="text-sm text-green-400">{selectedClub.phone}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                {selectedClub.description}
              </p>
              <div className="text-sm text-gray-300 mb-3">
                <strong className="text-yellow-300">
                  Conducted Competitions:
                </strong>
                <ul className="list-disc list-inside mt-1">
                  {selectedClub.competitions.map((comp, i) => (
                    <li key={i}>{comp}</li>
                  ))}
                </ul>
              </div>
              <button
                className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm transition shadow-sm"
                onClick={() => setSelectedClub(null)}
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Add Club */}
        <div className="text-center mt-6">
          {!showAddClubForm ? (
            <div
              className="cursor-pointer inline-block bg-yellow-400 text-black font-bold px-8 py-6 rounded-2xl shadow-lg hover:bg-yellow-500 transition"
              onClick={() => {
                uToken ? setShowAddClubForm(true) : navigate("/login");
              }}
            >
              <h3 className="text-xl"> Add Your Club</h3>
              <p className="text-sm text-gray-900">
                Click to share your club with others!
              </p>
            </div>
          ) : (
            <div className="bg-black/70 border border-yellow-400 rounded-2xl p-6 shadow-xl w-full sm:w-[32rem] mx-auto text-white">
              <h3 className="text-2xl font-bold mb-4 text-yellow-300">
                Add Your Club
              </h3>
              <form className="space-y-4" onSubmit={handleAddClubSubmit}>
                <input
                  name="name"
                  type="text"
                  placeholder="Club Name"
                  value={newClub.name}
                  onChange={handleNewClubChange}
                  className="w-full p-3 border rounded-md bg-gray-800 text-white border-yellow-400"
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={newClub.email}
                  onChange={handleNewClubChange}
                  className="w-full p-3 border rounded-md bg-gray-800 text-white border-yellow-400"
                  required
                />
                <input
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                  value={newClub.phone}
                  onChange={handleNewClubChange}
                  className="w-full p-3 border rounded-md bg-gray-800 text-white border-yellow-400"
                />
                <input
                  name="city"
                  type="text"
                  placeholder="City"
                  value={newClub.city}
                  onChange={handleNewClubChange}
                  className="w-full p-3 border rounded-md bg-gray-800 text-white border-yellow-400"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={newClub.description}
                  onChange={handleNewClubChange}
                  className="w-full p-3 border rounded-md bg-gray-800 text-white border-yellow-400"
                  rows="3"
                />
                <input
                  name="locationLink"
                  type="text"
                  placeholder="Google Maps Link"
                  value={newClub.locationLink}
                  onChange={handleNewClubChange}
                  className="w-full p-3 border rounded-md bg-gray-800 text-white border-yellow-400"
                />
                <input
                  name="competitions"
                  type="text"
                  placeholder="Competitions (comma separated)"
                  value={newClub.competitions}
                  onChange={handleNewClubChange}
                  className="w-full p-3 border rounded-md bg-gray-800 text-white border-yellow-400"
                />
                <input
                  type="file"
                  name="img"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="text-sm text-white"
                />

                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-3 rounded-md"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-md"
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
