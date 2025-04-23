import cloudinary from '../config/cloudinary.js';
import multer from 'multer';
import Club from '../models/clubModel.js';

// Set up multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const uploadClubImage = upload.single('img'); // Handle image upload

// Add a new club with an image
export const addClub = async (req, res) => {
  const { name, email, phone, city, description, location, competitions } = req.body;
  const img = req.file;

  if (!name || !email || !phone || !city || !location?.lat || !location?.lng) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    // Upload image to Cloudinary
    const uploadedImage = await cloudinary.v2.uploader.upload_stream(
      { resource_type: 'auto' },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: 'Image upload failed' });
        }

        const newClub = new Club({
          name,
          email,
          phone,
          city,
          description,
          location,
          competitions,
          img: result.secure_url, // Store the image URL
        });

        const savedClub = await newClub.save();
        res.status(201).json(savedClub);
      }
    );

    // Pipe the uploaded file to Cloudinary's uploader stream
    img.buffer.pipe(uploadedImage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all clubs
export const getClubs = async (req, res) => {
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
