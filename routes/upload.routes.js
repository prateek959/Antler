import express from 'express';
import { uploadCloud } from '../controller/upload.controller.js';

const uploadRouter = express.Router();

uploadRouter.post('/',uploadCloud);

export {uploadRouter};