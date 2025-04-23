import express from 'express';
import multer from 'multer';
import Competition from '../models/competitionModel.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { getCompetition, registerCompetition } from '../controllers/competitionController.js';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get('/getCompetition', getCompetition);

router.post('/registerCompetition', upload.single('posterImage'),registerCompetition);

export default router;
