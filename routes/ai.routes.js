import express from 'express';
import { ai } from '../controller/ai.controller.js';

const aiRouter = express.Router();

aiRouter.post('/', ai);


export {aiRouter};