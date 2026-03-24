import express from 'express';
const router = express.Router();

import petsRouter from './pets.js';

router.use('/pets', petsRouter);

export default router;