import express from 'express';
import { createCommunity, searchCommunities, searchCommunity, getAllCommunities } from '../controllers/community.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createCommunity);
router.get('/searchList', searchCommunities);
router.post('/searchSingle', searchCommunity);
router.get('/all', getAllCommunities);

export default router;