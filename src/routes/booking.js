const express = require('express');
const BookingController = require('../controllers/booking');
// const auth = require('../auth');

const router = express.Router();


router.post('/', BookingController.createBooking);

router.get('/', BookingController.getBookings);

router.delete('/:bookingId', BookingController.deleteBooking);


module.exports = router;
