import express from 'express';
import { addAnime } from '../controllers/animes.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Replace this with list of animes in database
router.get('/', (req, res) => {
    res.send('Back Animes API');
});

// PUT instead of POST because it will change the users myList array
router.put('/add', auth, addAnime);

export default router;