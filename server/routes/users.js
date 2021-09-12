import express from 'express';
import {signIn, signUp} from '../controllers/users.js';

const router = express.Router();


router.get('/', (req, res) => {
    res.send('User Route');
})

router.post('/signIn', signIn);
router.post('/signUp', signUp);

export default router;