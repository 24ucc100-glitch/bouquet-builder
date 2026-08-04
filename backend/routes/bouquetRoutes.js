import express from 'express';
import { generateBouquet } from '../controllers/bouquetController.js';

const router = express.Router();

// POST /api/generate
router.post('/generate', generateBouquet);

export default router;
