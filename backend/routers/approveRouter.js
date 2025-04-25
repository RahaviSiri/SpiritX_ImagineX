import express from 'express';
import { approveByAdmin,  approveByCoach,  countBooking,  rejectByAdmin, rejectByCoach } from '../controllers/approveController.js';
import authCoach from '../middleware/authCoach.js';

const approveRouter = express.Router();

approveRouter.post('/approve', approveByAdmin);
approveRouter.get('/count-booking', countBooking);
approveRouter.post('/reject', rejectByAdmin);
approveRouter.get('/approve-by-coach/:userId/:bookingId', approveByCoach)
approveRouter.get('/reject-by-coach/:userId/:bookingId', rejectByCoach)

export default approveRouter;