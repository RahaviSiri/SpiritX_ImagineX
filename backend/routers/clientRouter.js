import express from 'express'
import { getClientById, registerClient } from '../controllers/clientController.js';

const clientRouter = express.Router();

clientRouter.post('/book-coach/:id',registerClient)
clientRouter.get('/get-client/:clientId',getClientById)

export default clientRouter;