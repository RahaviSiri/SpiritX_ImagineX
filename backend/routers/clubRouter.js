import express from 'express'; // Use import instead of require
import { addClub, getClubs } from '../controllers/clubcontroller.js';

const router = express.Router();

// Route for getting all clubs
router.get('/', getClubs);

// Route for adding a new club
router.post('/', addClub);

export default router; // Default export
