import express from 'express';
import { getComments, createComment, replyComment } from '../controllers/comments.js';

const router = express.Router();

router.post('/', getComments);

router.post('/create', createComment);

router.post('/reply', replyComment);

export default router;