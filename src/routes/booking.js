const express = require('express');
const BookingController = require('../controllers/booking');
// const auth = require('../auth');

const router = express.Router();


router.post('/', BookingController.createBooking);

router.get('/', BookingController.getBookings);

router.delete('/:bookingId', BookingController.deleteBooking);

router.get('/swap/:bookingId', BookingController.checkAvailableSeats);

router.patch('/:bookingId', BookingController.changeSeat);


module.exports = router;
