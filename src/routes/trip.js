import express from 'express';
import TripController from '../controllers/trip';
import auth from '../auth';
import adminAuth from '../auth/adminAuth';

const router = express.Router();


router.post('/', auth, adminAuth, TripController.createTrip);

router.get('/', auth, TripController.getTrips);

router.patch('/:trip_id', auth, adminAuth, TripController.cancelTrip);

router.get('/:search', auth, TripController.filterTrip);


export default router;
