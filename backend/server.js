import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bouquetRoutes from './routes/bouquetRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://bouquet-builder-nu.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());

// Mount API routes
app.use('/api', bouquetRoutes);

// Root Healthcheck
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: '🌸 Bloom & Artistry AI Florist Studio Backend',
    version: '2.0.0'
  });
});

app.listen(PORT, () => {
  console.log(`🌸 Bloom & Artistry AI Florist Studio Backend listening on http://localhost:${PORT}`);
});
