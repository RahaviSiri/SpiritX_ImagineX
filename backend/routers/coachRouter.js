import express from 'express'
import { registerCoach } from '../controllers/coachController.js';
import upload from '../middleware/multer.js';

const coachRouter = express.Router();

coachRouter.post('/register',upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "NIC_photo", maxCount: 1 },
    { name: "qualifications_photo", maxCount: 1 }]), registerCoach);

export default coachRouter;