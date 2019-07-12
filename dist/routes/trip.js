"use strict";

var express = require('express');

var TripController = require('../controllers/trip'); // const auth = require('../auth');


var router = express.Router();
router.post('/', TripController.createTrip);
router.get('/', TripController.getTrips);
router.patch('/:tripId', TripController.cancelTrip);
router.get('/:search', TripController.filterTrip);
module.exports = router;