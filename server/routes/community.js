import express from 'express';
import { createCommunity, searchCommunities, searchCommunity } from '../controllers/community.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createCommunity);
router.get('/searchList', searchCommunities);
router.get('/community/searchSingle', searchCommunity);

export default router;