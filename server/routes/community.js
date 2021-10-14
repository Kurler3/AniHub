import express from 'express';
import { createCommunity, searchCommunities } from '../controllers/community.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createCommunity);
router.get('/searchList', searchCommunities);

export default router;