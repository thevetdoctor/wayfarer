"use strict";

var express = require('express');

var BookingController = require('../controllers/booking'); // const auth = require('../auth');


var router = express.Router();
router.post('/', BookingController.createBooking);
router.get('/', BookingController.getBookings);
router["delete"]('/:bookingId', BookingController.deleteBooking);
router.get('/swap/:bookingId', BookingController.checkAvailableSeats);
router.patch('/:bookingId', BookingController.changeSeat);
module.exports = router;