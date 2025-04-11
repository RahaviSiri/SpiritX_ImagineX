import express from 'express';
import { approveByAdmin } from '../controllers/approveController.js';

const approveRouter = express.Router();

approveRouter.post('/approve',approveByAdmin);

export default approveRouter;