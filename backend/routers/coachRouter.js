import express from 'express'
import {  checkOTP, deleteCoach, editDetails, getCoach, getCoachById, getCoaches, registerCoach,  verifyPayment } from '../controllers/coachController.js';
import upload from '../middleware/multer.js';
import authCoach from '../middleware/authCoach.js';

const coachRouter = express.Router();

coachRouter.post('/register',upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "NIC_photo", maxCount: 1 },
    { name: "qualifications_photo", maxCount: 1 }]), registerCoach);
coachRouter.put('/edit/:id',upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "NIC_photo", maxCount: 1 },
    { name: "qualifications_photo", maxCount: 1 }]), editDetails)
coachRouter.post('/check-otp',authCoach,checkOTP)
coachRouter.get('/getCoaches',getCoaches)
coachRouter.get('/getCoach',authCoach, getCoach)
coachRouter.get('/getCoachById/:id', getCoachById)
coachRouter.post('/verify', verifyPayment)
coachRouter.delete('/delete-coach/:id',deleteCoach)

export default coachRouter;