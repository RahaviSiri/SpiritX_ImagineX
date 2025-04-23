import Club from '../models/clubmodel.js'; // Use ES import

// Get all clubs
export const getClubs = async (req, res) => {
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new club
export const addClub = async (req, res) => {
  const { name, email, phone, city, description, location, competitions, img } = req.body;

  const newClub = new Club({
    name,
    email,
    phone,
    city,
    description,
    location,
    competitions,
    img // Add this field if needed
  });

  try {
    const savedClub = await newClub.save();
    res.status(201).json(savedClub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
