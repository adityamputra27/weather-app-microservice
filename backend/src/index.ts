import dotenv from 'dotenv';
import express, { Router } from 'express';
import weatherRouter from './routes/weather';
import connectDB from './config/database';
import cors from 'cors';
dotenv.config();

const app = express();
const router = Router();

connectDB();

app.use(cors());
app.use(express.json());

router.get('/', (req, res) => {
  res.send('Hello World test');
});

app.use('/', router);

app.use('/api/weather', weatherRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default router;


