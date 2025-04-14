import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './config/mongodb.js';
import dotenv from 'dotenv';
import coachRouter from './routers/coachRouter.js';
import connectCloudinary from './config/cloudinary.js';
import upload from './middleware/multer.js';
import {v2 as cloudinary} from 'cloudinary'
import approveRouter from './routers/approveRouter.js';
import groundRouter from './routers/groundRouter.js';

const app = express();
const port = process.env.port || 3000;
dotenv.config();

connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5174', credentials: true }));

// Routes 
app.use('/api/coach',coachRouter)
app.use('/api/admin',approveRouter)
app.use('/api/ground',groundRouter);

app.get('/', (req, res) => {
    res.json('API is working')
})

app.listen(port, () => {
    console.log(`API is running on ${port}`)
})


// app.post('/test-upload', upload.single('testImg'), async (req, res) => {
//     try {
//       console.log(req.file); // <-- See if multer worked
//       const result = await cloudinary.uploader.upload(req.file.path);
//       res.json({ url: result.secure_url });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ error: err.message });
//     }
//   });