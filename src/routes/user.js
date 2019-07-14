import express from 'express';
import UserController from '../controllers/user';
import validateUser from '../helpers/validate/validateUser';
import auth from '../auth';
import adminAuth from '../auth/adminAuth';

const router = express.Router();


// router.post('/signup', UserController.createUser);
router.post('/signup', validateUser.validateSignup, UserController.createUser);

// router.post('/signin', UserController.signIn);
router.post('/signin', validateUser.validateSignin, UserController.signIn);

router.get('/', auth, adminAuth, UserController.getUsers);


export default router;
