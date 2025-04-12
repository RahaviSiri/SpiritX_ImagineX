import express from 'express';
import { approveByAdmin, rejectByAdmin } from '../controllers/approveController.js';
import authCoach from '../middleware/authCoach.js';

const approveRouter = express.Router();

approveRouter.post('/approve',authCoach, approveByAdmin);
approveRouter.post('/reject',authCoach, rejectByAdmin);

export default approveRouter;