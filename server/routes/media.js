import express from 'express';
import { getPosts, createPost } from '../controllers/media.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/posts',auth ,getPosts);
router.post('/createPost', createPost);

export default router;