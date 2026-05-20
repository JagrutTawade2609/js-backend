import express from 'express';
import MainRouter from './routes/index.js';
import mongoose from 'mongoose';
import dotenv from "dotenv"
import cors from "cors"

const app = express();
dotenv.config()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/api/v1',MainRouter)

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected to MongoDB");
})

app.listen(4000, () => {console.log("Port 4000 Running")})