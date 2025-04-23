import express from 'express';
import { addClub, getClubs, uploadClubImage } from '../controllers/clubcontroller.js';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

// POST route to add a new club with image upload
router.post('/', uploadClubImage, addClub);

// GET route to get all clubs
router.get('/', getClubs);

export default router;
