import express from 'express'
import { registerClient } from '../controllers/clientController.js';

const clientRouter = express.Router();

clientRouter.post('/book-coach/:coachId',registerClient)

export default clientRouter;