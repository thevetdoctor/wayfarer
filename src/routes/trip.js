const express = require('express');
const TripController = require('../controllers/trip');
const auth = require('../auth');

const router = express.Router();


router.post('/', auth, TripController.createTrip);

router.get('/', TripController.getTrips);

router.patch('/:tripId', auth, TripController.cancelTrip);

router.get('/:search', TripController.filterTrip);


module.exports = router;
