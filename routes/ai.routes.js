import express from 'express';
import { ai, aiAnalysis } from '../controller/ai.controller.js';
import { convertText } from '../middleware/ai.middleware.js';

const aiRouter = express.Router();

aiRouter.post('/', ai);
aiRouter.post('/summary',convertText,aiAnalysis);

export {aiRouter};