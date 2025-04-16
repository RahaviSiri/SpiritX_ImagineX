import express from 'express';
import { approveByAdmin,  approveByCoach,  rejectByAdmin, rejectByCoach } from '../controllers/approveController.js';
import authCoach from '../middleware/authCoach.js';

const approveRouter = express.Router();

approveRouter.post('/approve',authCoach, approveByAdmin);
approveRouter.post('/reject',authCoach, rejectByAdmin);
approveRouter.get('/approve-by-coach/:userId/:bookingId', approveByCoach)
approveRouter.get('/reject-by-coach/:userId/:bookingId', rejectByCoach)

export default approveRouter;