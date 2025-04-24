import { v2 as cloudinary } from 'cloudinary';
import Club from '../models/clubModel.js';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Set up multer storage to save file to disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // You need to create this folder manually
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Middleware for handling image uploads
export const uploadClubImage = upload.single('img');

// Controller to add a new club
export const addClub = async (req, res) => {
  const { name, email, phone, city, description, location, competitions } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !city || !location?.lat || !location?.lng) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
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
