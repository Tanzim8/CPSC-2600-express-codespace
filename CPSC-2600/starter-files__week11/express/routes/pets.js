import express from 'express';
const petsRouter = express.Router();

import { getPets, postPet } from '../controllers/pets.js';

//requests to /api/v1/pets - retrive an array of pets
petsRouter.get('/', getPets);
petsRouter.post('/', postPet);

export default petsRouter;