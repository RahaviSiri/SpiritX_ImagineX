import express from 'express';
import { addClub, getClubs } from '../controllers/clubController.js';
import upload from '../middleware/multer.js';

const router = express.Router();

// POST route to add a new club with image upload
router.post('/addClub', upload.single('img'), addClub);
// GET route to get all clubs
router.get('/getClub', getClubs);

export default router;
