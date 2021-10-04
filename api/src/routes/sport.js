import express from 'express';
import SportController from '../controllers/SportController'

const router = express.Router();

router.get('/sports', SportController.index);

export default router;
