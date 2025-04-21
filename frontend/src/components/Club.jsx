import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerRetina from 'leaflet/dist/images/marker-icon-2x.png';
import { clubs } from '../assets/Club';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function ClubPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClubs, setFilteredClubs] = useState(clubs);
  const [selectedClub, setSelectedClub] = useState(null);
  const [mapClickLocation, setMapClickLocation] = useState(null);

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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Explore Clubs Near You</h1>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search for clubs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-l-md p-2 w-64"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-md">
          Search
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="ml-2 bg-gray-400 hover:bg-gray-500 text-white px-4 rounded-md"
        >
          ↺
        </button>
      </form>

      {/* Map with overlay */}
      <div className="relative h-[500px] w-full max-w-6xl mx-auto mb-6">
        <MapContainer center={[7.0, 80.0]} zoom={7} scrollWheelZoom className="h-full w-full rounded-xl shadow-lg z-0">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredClubs.map((club, idx) => (
            <Marker
              key={idx}
              position={[club.location.lat, club.location.lng]}
              eventHandlers={{
                click: () => {
                  setSelectedClub(club);
                },
              }}
            />
          ))}
          <MapClickHandler />
        </MapContainer>

        {/* Overlayed Club Info Card */}
        {selectedClub && (
          <div className="absolute top-4 right-4 bg-white border border-gray-300 shadow-xl rounded-xl p-4 w-80 z-[1000]">
            <div className="flex items-center mb-4">
              <img src={selectedClub.img} alt={selectedClub.name} className="w-16 h-16 rounded-full object-cover mr-4" />
              <div>
                <h2 className="text-lg font-bold">{selectedClub.name}</h2>
                <p className="text-sm text-gray-500">{selectedClub.city}</p>
                <p className="text-sm text-blue-500">{selectedClub.email}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-2">{selectedClub.description}</p>
            <ul className="text-sm text-gray-600 list-disc list-inside">
              {selectedClub.competitions.map((comp, i) => (
                <li key={i}>{comp}</li>
              ))}
            </ul>
            <button
              className="mt-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600"
              onClick={() => setSelectedClub(null)}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
