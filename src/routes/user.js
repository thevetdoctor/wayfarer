import express from 'express';
import UserController from '../controllers/user';

const router = express.Router();


router.post('/signup', UserController.createUser);

router.post('/signin', UserController.signIn);

router.get('/', UserController.getUsers);


export default router;
