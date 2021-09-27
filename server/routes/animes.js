import express from 'express';
import { addAnime, getAnime, removeAnime } from '../controllers/animes.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Replace this with list of animes in database
router.get('/',auth, getAnime);

// PUT instead of POST because it will change the users myList array
router.put('/add', auth, addAnime);

router.put('/remove', auth, removeAnime);

export default router;