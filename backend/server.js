import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js';
import dotenv from 'dotenv';
import coachRouter from './routers/coachRouter.js';
import connectCloudinary from './config/cloudinary.js';
import approveRouter from './routers/approveRouter.js';
import groundRouter from './routers/groundRouter.js';
import userRouter from './routers/userRouter.js';


const app = express();
const port = process.env.port || 3000;
dotenv.config();

connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors({ origin: true, credentials: true })); // Allow all origins

// Routes 
app.use('/api/coach',coachRouter)
app.use('/api/admin',approveRouter)
app.use('/api/client',clientRouter)
app.use('/api/ground',groundRouter);
app.use('/api/user',userRouter);

app.get('/', (req, res) => {
    res.json('API is working')
})

app.listen(port, () => {
    console.log(`API is running on ${port}`)
})

