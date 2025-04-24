import express from 'express';
import { getCompetition, registerCompetition } from '../controllers/competitionController.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.get('/getCompetition', getCompetition);
router.post('/registerCompetition', upload.single('posterImage'),registerCompetition);

export default router;
