import express from 'express';
import { createCommunity, searchCommunities, searchCommunity, getAllCommunities, updateSubUnsubCommunity } from '../controllers/community.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createCommunity);
router.post('/searchList', searchCommunities);
router.post('/searchSingle', searchCommunity);
router.get('/all', getAllCommunities);
router.post('/updateSubUnsub', updateSubUnsubCommunity);

export default router;