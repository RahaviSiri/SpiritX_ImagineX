import express from 'express';
import { approveByAdmin,  approveByCoach,    countBooking,  getAdminDashboardData,  rejectByAdmin, rejectByCoach, checkAdminLogin, approveAcademyByAdmin, rejectAcademyByAdmin } from '../controllers/approveController.js';
import authCoach from '../middleware/authCoach.js';
import authAcademy from '../middleware/authAcademy.js';

const approveRouter = express.Router();

approveRouter.post('/approve', approveByAdmin);
approveRouter.get('/count-booking', countBooking);
approveRouter.get('/dashboard', getAdminDashboardData);
approveRouter.post('/reject', rejectByAdmin);
approveRouter.post('/approve-academy', approveAcademyByAdmin);
approveRouter.post('/reject-academy', rejectAcademyByAdmin);
approveRouter.get('/approve-by-coach/:userId/:bookingId', approveByCoach)
approveRouter.get('/reject-by-coach/:userId/:bookingId', rejectByCoach)
approveRouter.post('/check-admin-login', checkAdminLogin)

export default approveRouter;