import express from 'express';
import MainRouter from './routes/index.js';

const app = express();

app.use(express.json())

app.use('/api/v1',MainRouter)

app.listen(4000, () => {console.log("Port 4000 Running")})