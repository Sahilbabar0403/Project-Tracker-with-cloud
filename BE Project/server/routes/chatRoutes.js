import express from 'express';
import { protectRoute } from '../middlewares/authMiddlewave.js';
import { createChat } from '../controllers/chatController.js';

const router = express.Router();

router.post('/', protectRoute, createChat);

export default router;