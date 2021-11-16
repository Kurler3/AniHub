import express from 'express';
import {signIn, signUp, getUserInfo, subUnSub} from '../controllers/users.js';

const router = express.Router();


router.get('/', (req, res) => {
    res.send('User Route');
})

router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.get('/getInfo', getUserInfo);
router.post('/sub', subUnSub);

export default router;