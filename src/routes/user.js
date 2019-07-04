import express from 'express';
import UserController from '../controllers/user';

const router = express.Router();


router.post('/signup', UserController.createUser);


export default router;
