import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddClubPage() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    email: '',
    logoUrl: '',
    competitions: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const clubData = {
      ...form,
      competitions: form.competitions.split(',').map(c => c.trim()),
    };
    console.log("Club Submitted:", clubData);
    alert("Club added (for now it’s just logged in console)");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">➕ Add Your Club</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Club Name</label>
            <input
              name="name"
              type="text"
              placeholder="e.g. Volleyball Club"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              placeholder="Tell us about the club..."
              value={form.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 h-24 resize-none focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Contact Email</label>
            <input
              name="email"
              type="email"
              placeholder="e.g. volleyball@university.edu"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Logo URL</label>
            <input
              name="logoUrl"
              type="url"
              placeholder="e.g. https://example.com/logo.png"
              value={form.logoUrl}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Competitions (comma separated)</label>
            <input
              name="competitions"
              type="text"
              placeholder="e.g. Annual League, Winter Tournament"
              value={form.competitions}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Submit Club
          </button>
        </form>
        <Link to="/" className="text-blue-600 underline mb-4 inline-block">
            ← Back to Club List
        </Link>
      </div>
    </div>
  );
}
