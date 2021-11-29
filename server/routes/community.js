import express from 'express';
import { createCommunity, searchCommunities, searchCommunity, getAllCommunities, updateSubUnsubCommunity, removeMember, blockMember, addAdmin } from '../controllers/community.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createCommunity);
router.post('/searchList', searchCommunities);
router.post('/searchSingle', searchCommunity);
router.get('/all', getAllCommunities);
router.post('/updateSubUnsub', updateSubUnsubCommunity);
router.post('/removeMember', removeMember);
router.post('/block', blockMember);
router.post('/addAdmin', addAdmin);

export default router;