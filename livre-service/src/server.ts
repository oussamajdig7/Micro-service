import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import bookRoutes from './routes/bookRoutes.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

// connect DB
connectDB();

app.use(cors());
app.use(express.json());

// routes
app.use('/books', bookRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server started on port ${port}`);
});