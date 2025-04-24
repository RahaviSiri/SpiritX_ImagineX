import express from 'express';
import { addClub, getClubs, uploadClubImage } from '../controllers/clubController.js';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

// POST route to add a new club with image upload
router.post('/addClub', uploadClubImage, addClub);

// GET route to get all clubs
router.get('/getClub', getClubs);

export default router;
