import express from 'express';
import { approveByAdmin,  approveByCoach,    countBooking,  getAdminDashboardData,  rejectByAdmin, rejectByCoach, checkAdminLogin } from '../controllers/approveController.js';
import authCoach from '../middleware/authCoach.js';

const approveRouter = express.Router();

approveRouter.post('/approve', approveByAdmin);
approveRouter.get('/count-booking', countBooking);
approveRouter.get('/dashboard', getAdminDashboardData);
approveRouter.post('/reject', rejectByAdmin);
approveRouter.get('/approve-by-coach/:userId/:bookingId', approveByCoach)
approveRouter.get('/reject-by-coach/:userId/:bookingId', rejectByCoach)
approveRouter.post('/check-admin-login', checkAdminLogin)

export default approveRouter;