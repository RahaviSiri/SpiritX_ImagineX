import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './config/mongodb.js';
import dotenv from 'dotenv';

const app = express();
const port = process.env.port || 3000;

const allowedURL = process.env.frontendURL;
dotenv.config();

connectDB();

app.use(express.json());
app.use(cors({ origin: allowedURL, credentials: true }));

app.listen(port, () => {
    console.log(`API is running on ${port}`)
})

app.get('/', (req, res) => {
    res.json('API is working')
})