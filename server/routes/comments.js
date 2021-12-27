import express from 'express';
import { getComments, createComment, replyComment, voteComment, getProfileComments } from '../controllers/comments.js';

const router = express.Router();

router.post('/', getComments);

router.post('/create', createComment);

router.post('/reply', replyComment);

router.post('/vote', voteComment);

router.get('/profile', getProfileComments);

export default router;