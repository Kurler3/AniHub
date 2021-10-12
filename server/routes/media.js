import express from 'express';
import { getMediaHomePosts } from '../controllers/media.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/posts',auth ,getMediaHomePosts);

export default router;