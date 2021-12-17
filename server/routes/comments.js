import express from 'express';
import { getComments, createComment, getSubComments, replyComment } from '../controllers/comments.js';

const router = express.Router();

router.post('/', getComments);

router.post('/create', createComment);

router.post('/sub', getSubComments);

router.post('/reply', replyComment);

export default router;