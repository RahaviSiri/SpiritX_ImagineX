import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import coachRouter from './routers/coachRouter.js';
import approveRouter from './routers/approveRouter.js';
import groundRouter from './routers/groundRouter.js';
import userRouter from './routers/userRouter.js';
import competition from './routers/competitionRouter.js';
import clubRouter from './routers/clubRouter.js';
import contactRouter from './routers/contactRouter.js';
import academyRouter from './routers/academyRouter.js';
import utilsRouter from './routers/utilsRouter.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));


app.use('/api/coach', coachRouter);
app.use('/api/admin', approveRouter);
app.use('/api/ground', groundRouter);
app.use('/api/user', userRouter);
app.use('/api/contact',contactRouter);
app.use('/api/competition', competition);
app.use('/api/clubs', clubRouter);
app.use('/api/academy', academyRouter);
app.use('/api/utils', utilsRouter);


app.get('/', (req, res) => {
  res.json('API is working');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
