import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerRetina from 'leaflet/dist/images/marker-icon-2x.png';
import axios from 'axios'; // We'll use axios to make API requests
import bgImage from '../assets/clubbg.jpg';

// Setup Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function ClubPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [showAddClubForm, setShowAddClubForm] = useState(false);
  const [newClub, setNewClub] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    description: '',
    locationLink: '',
    competitions: '',
  });
  const [submissionStatus, setSubmissionStatus] = useState(''); // For showing success or error messages

  // Fetch clubs from the backend when the component mounts
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/clubs'); // Replace with your API URL
        setClubs(response.data);
        setFilteredClubs(response.data);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    };

    fetchClubs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.toLowerCase();
    const filtered = clubs.filter(club =>
      club.name.toLowerCase().includes(term) ||
      club.description.toLowerCase().includes(term) ||
      club.city.toLowerCase().includes(term)
    );
    setFilteredClubs(filtered);
    setSelectedClub(null);
  };

  const handleReset = () => {
    setSearchTerm('');
    setFilteredClubs(clubs);
    setSelectedClub(null);
  };

  function MapClickHandler() {
    useMapEvents({
      click: () => setSelectedClub(null),
    });
    return null;
  }

  const handleNewClubChange = (e) => {
    setNewClub({
      ...newClub,
      [e.target.name]: e.target.value,
    });
  };

  const extractLatLngFromLink = (link) => {
    try {
      const match = link.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (match) {
        return {
          lat: parseFloat(match[1]),
          lng: parseFloat(match[2]),
        };
      }
    } catch (err) {
      console.error('Invalid link format');
    }
    return { lat: 7.0, lng: 80.0 }; // default
  };

  const handleAddClubSubmit = async (e) => {
    e.preventDefault();
    const location = extractLatLngFromLink(newClub.locationLink);
    const competitions = newClub.competitions.split(',').map(c => c.trim());
  
    const addedClub = {
      name: newClub.name,
      email: newClub.email,
      phone: newClub.phone,
      city: newClub.city,
      description: newClub.description,
      location,
      competitions
    };
  
    try {
      // Add the new club to the backend
      const response = await axios.post('http://localhost:3000/api/clubs', addedClub); // Replace with your API URL
      setClubs([...clubs, response.data]);
      setFilteredClubs([...clubs, response.data]);
      setNewClub({
        name: '',
        email: '',
        phone: '',
        city: '',
        description: '',
        locationLink: '',
        competitions: '',
      });
      setShowAddClubForm(false);
      setSubmissionStatus('success'); // Set success message
    } catch (error) {
      console.error('Error adding club:', error); // Log the error
  
      // Check if error response exists and log it
      if (error.response) {
        console.error('Error response:', error.response);
        console.error('Error status:', error.response.status);
        console.error('Error message:', error.response.data); // Server error details
        setSubmissionStatus('error'); // Set error message
      } else if (error.request) {
        console.error('Error request:', error.request); // If request was made but no response
        setSubmissionStatus('error'); // Set error message
      } else {
        console.error('Error:', error.message); // Log any other errors
        setSubmissionStatus('error'); // Set error message
      }
    }
  };
  

  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 py-10 sm:py-12"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-8 text-sky-900 drop-shadow">
          🌍 Explore Clubs Near You
        </h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row justify-center items-center mb-8 gap-4">
          <input
            type="text"
            placeholder="Search for clubs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md p-3 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow-md">
              🔍 Search
            </button>
            <button type="button" onClick={handleReset} className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-md shadow-md">
              ↺ Reset
            </button>
          </div>
        </form>

        {/* Map Display */}
        <div className="relative h-[400px] sm:h-[500px] w-full mb-6 rounded-2xl overflow-hidden shadow-xl">
          <MapContainer center={[7.0, 80.0]} zoom={7} scrollWheelZoom className="h-full w-full z-0">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredClubs.map((club, idx) => (
              <Marker
                key={idx}
                position={[club.location.lat, club.location.lng]}
                eventHandlers={{
                  click: () => setSelectedClub(club),
                }}
              />
            ))}
            <MapClickHandler />
          </MapContainer>

          {/* Club Details Popup */}
          {selectedClub && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-xl p-5 w-full sm:w-96 z-[1000] transition-all">
              <div className="flex items-center mb-4">
                <img
                  src={selectedClub.img}
                  alt={selectedClub.name}
                  className="w-16 h-16 rounded-full object-cover mr-4 shadow-md"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{selectedClub.name}</h2>
                  <p className="text-sm text-gray-600">{selectedClub.city}</p>
                  <p className="text-sm text-blue-600">{selectedClub.email}</p>
                  <p className="text-sm text-green-600">{selectedClub.phone}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-3">{selectedClub.description}</p>
              <div className="text-sm text-gray-700 mb-3">
                <strong>Conducted Competitions:</strong>
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

        {/* Add Club Flashcard/Form */}
        <div className="text-center mt-6">
          {!showAddClubForm ? (
            <div
              className="cursor-pointer inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
              onClick={() => setShowAddClubForm(true)}
            >
              <h3 className="text-xl font-bold">➕ Add Your Club</h3>
              <p className="text-sm">Click to share your club with others!</p>
            </div>
          ) : (
            <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-xl w-full sm:w-[32rem] mx-auto">
              <h3 className="text-2xl font-semibold mb-4 text-blue-700">Add Your Club</h3>
              <form className="space-y-4" onSubmit={handleAddClubSubmit}>
                <input name="name" type="text" placeholder="Club Name" value={newClub.name} onChange={handleNewClubChange} className="w-full p-3 border rounded-md" required />
                <input name="email" type="email" placeholder="Email" value={newClub.email} onChange={handleNewClubChange} className="w-full p-3 border rounded-md" required />
                <input name="phone" type="text" placeholder="Phone Number" value={newClub.phone} onChange={handleNewClubChange} className="w-full p-3 border rounded-md" />
                <input name="city" type="text" placeholder="City" value={newClub.city} onChange={handleNewClubChange} className="w-full p-3 border rounded-md" />
                <textarea name="description" placeholder="Description" value={newClub.description} onChange={handleNewClubChange} className="w-full p-3 border rounded-md"></textarea>
                <input name="locationLink" type="text" placeholder="Google Maps Link (with @lat,lng)" value={newClub.locationLink} onChange={handleNewClubChange} className="w-full p-3 border rounded-md" required />
                <input name="competitions" type="text" placeholder="Competitions (comma-separated)" value={newClub.competitions} onChange={handleNewClubChange} className="w-full p-3 border rounded-md" />

                <div className="flex justify-between items-center">
                  <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md">
                    Submit
                  </button>
                  <button type="button" className="text-red-600 hover:underline" onClick={() => setShowAddClubForm(false)}>
                    Cancel
                  </button>
                </div>
              </form>

              {/* Display Submission Status Message */}
              {submissionStatus === 'success' && (
                <div className="mt-4 p-4 text-center bg-green-500 text-white rounded-md">
                  Club added successfully!
                </div>
              )}
              {submissionStatus === 'error' && (
                <div className="mt-4 p-4 text-center bg-red-500 text-white rounded-md">
                  There was an error adding the club. Please try again.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
