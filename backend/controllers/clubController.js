import { v2 as cloudinary } from 'cloudinary';
import Club from '../models/clubModel.js';
import dotenv from 'dotenv';
import multer from 'multer';
import { PassThrough } from 'stream';

// Load environment variables (if needed)
dotenv.config();

// Set up multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware for handling image uploads
export const uploadClubImage = upload.single('img');

// Controller to add a new club
export const addClub = async (req, res) => {
  const { name, email, phone, city, description, location, competitions } = req.body;
  const img = req.file;

  // Validate required fields
  if (!name || !email || !phone || !city || !location?.lat || !location?.lng) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    if (!img) {
      return res.status(400).json({ message: 'Image file is required.' });
    }

    // Convert image buffer to stream
    const bufferStream = new PassThrough();
    bufferStream.end(img.buffer);

    // Upload image to Cloudinary in 'clubs' folder
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        folder: 'clubs', // 👈 All images will be stored in this folder
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: 'Image upload failed', error });
        }

        // Create and save the new club document
        const newClub = new Club({
          name,
          email,
          phone,
          city,
          description,
          location,
          competitions,
          img: result.secure_url, // Store image URL
        });

        const savedClub = await newClub.save();
        res.status(201).json(savedClub);
      }
    );

    // Pipe the image stream to Cloudinary
    bufferStream.pipe(uploadStream);
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
