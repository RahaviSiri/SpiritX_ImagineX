import { v2 as cloudinary } from 'cloudinary';
import Club from '../models/clubModel.js';
import fs from 'fs';
import { resolveShortLink } from '../utils/resolveShortLink.js';

// Helper function to extract coordinates from a Google Maps URL
const extractLatLngFromLink = (url) => {
  const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (match) {
    return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
  }
  return null;
};

// Controller to add a new club
export const addClub = async (req, res) => {
  let { name, email, phone, city, description, location, competitions } = req.body;

  try {
    if (!name || !email || !phone || !city || !location) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // If location is a shortlink, resolve and extract lat/lng
    if (typeof location === 'string' && /(goo\.gl|maps\.app\.goo\.gl)/.test(location)) {
      const resolvedLink = await resolveShortLink(location);
      const coords = extractLatLngFromLink(resolvedLink);
      if (!coords) throw new Error("Couldn't extract coordinates from Google Maps link.");
      location = coords;
    }

    if (!location?.lat || !location?.lng) {
      return res.status(400).json({ message: 'Location coordinates are missing or invalid.' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required.' });
    }

    const filePath = req.file.path;

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'image',
      folder: 'clubs',
    });

    // Delete local file
    fs.unlinkSync(filePath);

    // Create and save the new club document
    const newClub = new Club({
      name,
      email,
      phone,
      city,
      description,
      location,
      competitions,
      img: result.secure_url,
    });

    const savedClub = await newClub.save();
    res.status(201).json(savedClub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller to get all clubs
export const getClubs = async (req, res) => {
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
