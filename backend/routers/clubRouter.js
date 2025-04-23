import express from 'express';
import { addClub, getClubs, uploadClubImage } from '../controllers/clubcontroller.js';

const router = express.Router();

// POST route to add a new club with image upload
router.post('/', uploadClubImage, addClub);

// GET route to get all clubs
router.get('/', getClubs);

export default router;
