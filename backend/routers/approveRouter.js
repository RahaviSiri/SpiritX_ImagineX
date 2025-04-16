import express from 'express';
import { approveByAdmin, approveBycoach, rejectByAdmin, rejectByCoach } from '../controllers/approveController.js';
import authCoach from '../middleware/authCoach.js';

const approveRouter = express.Router();

approveRouter.post('/approve',authCoach, approveByAdmin);
approveRouter.post('/reject',authCoach, rejectByAdmin);
approveRouter.get('/approve-by-coach/:clientId', approveBycoach)
approveRouter.get('/reject-by-coach/:clientId', rejectByCoach)

export default approveRouter;