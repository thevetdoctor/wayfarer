import express from 'express';
import BusController from '../controllers/bus';
import auth from '../auth';
import adminAuth from '../auth/adminAuth';

const router = express.Router();


router.get('/', auth, adminAuth, BusController.getBuses);


export default router;
