import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";

function App() {
  const [competitions, setCompetitions] = useState([]);
  const [posterImage, setPosterImage] = useState(null);
  const [registrationLink, setRegistrationLink] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    loadCompetitions();
  }, []);

  const loadCompetitions = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/competition/getCompetition');
      const data = await response.json();
      setCompetitions(data.competitions);
    } catch (error) {
      console.error('Failed to load competitions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('posterImage', posterImage);
    formData.append('registrationLink', registrationLink);

    try {
      await fetch('http://localhost:3000/api/competition/registerCompetition', {
        method: 'POST',
        body: formData,
      });

      setPosterImage(null);
      setRegistrationLink('');
      loadCompetitions();
      toast.success('Competition added successfully!');
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting competition:', error);
      toast.error('Error adding competition!');
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-950 via-black to-gray-900 text-white px-4 pt-20">
      {/* Form overlay */}
      {showForm && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"></div>}
  
      {/* Hero */}
      <div className="text-center mb-12 mt-2">
        <h1 className="text-4xl font-extrabold text-yellow-400 drop-shadow-lg">🏆 Competitions</h1>
        <p className="text-gray-300 mt-3 text-lg max-w-2xl mx-auto">Explore and register for upcoming competitions, or add new ones!</p>
      </div>
  
      {/* Competition cards */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto transition duration-300 ${showForm ? 'blur-sm pointer-events-none' : ''}`}
      >
        {competitions.map((competition) => (
          <div
            key={competition._id}
            className="relative bg-white/5 backdrop-blur-md border border-yellow-400/40 shadow-lg p-5 rounded-3xl hover:scale-105 transition-transform duration-300"
          >
            <img
              src={competition.posterImage}
              alt="Competition Poster"
              onClick={() => setPreviewImage(competition.posterImage)}
              className="w-full h-56 object-cover rounded-2xl mb-4 cursor-pointer"
            />
            <a
              href={competition.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-yellow-300 font-semibold text-center hover:underline text-lg"
            >
              Register Here
            </a>
          </div>
        ))}
      </div>
  
      {/* Add Competition Button */}
      <div className="mt-12 text-center">
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-8 rounded-full font-bold text-lg transition-transform hover:scale-105"
        >
          ➕ Add Competition
        </button>
      </div>
  
      {/* Add Competition Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-black border border-yellow-400 w-full max-w-md p-8 rounded-2xl shadow-2xl relative animate-fade-in">
            <h1 className="text-3xl font-bold text-yellow-300 mb-6 text-center">
              Add Competition
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="file"
                onChange={(e) => setPosterImage(e.target.files[0])}
                required
                className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-500"
              />
              <input
                type="text"
                value={registrationLink}
                onChange={(e) => setRegistrationLink(e.target.value)}
                placeholder="🔗 Registration Link"
                required
                className="w-full p-3 border border-gray-600 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="w-full bg-yellow-400 text-black py-3 rounded-xl text-lg font-bold hover:bg-yellow-500 transition duration-300"
              >
                Submit
              </button>
            </form>
            <button
              onClick={handleCloseForm}
              className="absolute top-3 right-4 text-2xl font-bold text-white hover:text-red-500 transition"
            >
              &times;
            </button>
          </div>
        </div>
      )}
  
      {/* Preview Image Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Full View"
            className="max-w-5xl max-h-[90vh] object-contain rounded-xl border-4 border-yellow-400"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-6 right-8 text-yellow-400 text-4xl font-bold hover:text-red-400 transition"
            onClick={() => setPreviewImage(null)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
  
}

export default App;
