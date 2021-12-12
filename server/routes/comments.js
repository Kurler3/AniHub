import express from 'express';
import { getComments, createComment } from '../controllers/comments.js';

const router = express.Router();

router.post('/', getComments);

router.post('/create', createComment);

export default router;