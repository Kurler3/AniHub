import express from 'express';
import { getPosts, createPost, votePost, deletePost } from '../controllers/media.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/posts',auth ,getPosts);
router.post('/createPost', createPost);
router.post('/votePost', votePost);
router.post('/deletePost', deletePost);


export default router;