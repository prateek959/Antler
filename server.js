import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import multer from 'multer';
import cron from 'node-cron';
import { rateLimit } from 'express-rate-limit';
import { db } from './config/db.js';
import { redis } from './redis/redis.connection.js';
import { aiRouter } from './routes/ai.routes.js';
import { uploadRouter } from './routes/upload.routes.js';


const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/public/images', express.static(path.join(__dirname, 'public', 'images')));

app.use(cors({
  origin: process.env.FRONTEND_URL
}));


const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 50
});
app.use(limiter);

cron.schedule("0 0 0 * * *", async () => {
  try {
    await redis.flushdb();
    console.log("Redis cache flushed.");
  } catch (error) {
    console.error("Redis flush error:", error.message);
  }
});

const storage = multer.diskStorage({
  destination: './public/images',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

app.use('/analyze', aiRouter);
app.use('/upload', upload.single('file'), uploadRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await db();
  console.log(`Server is running on port ${PORT}`);
});
