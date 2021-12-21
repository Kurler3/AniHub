import express from 'express';
import { getComments, createComment, replyComment, voteComment } from '../controllers/comments.js';

const router = express.Router();

router.post('/', getComments);

router.post('/create', createComment);

router.post('/reply', replyComment);

router.post('/vote', voteComment);

export default router;