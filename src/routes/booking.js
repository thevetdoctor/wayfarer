import express from 'express';
import BookingController from '../controllers/booking';
import auth from '../auth';
import ownerAuth from '../auth/ownerAuth';


const router = express.Router();


router.post('/', auth, BookingController.createBooking);

router.get('/', auth, ownerAuth, BookingController.getBookings);

router.delete('/:booking_id', auth, ownerAuth, BookingController.deleteBooking);

router.get('/swap/:booking_id', auth, ownerAuth, BookingController.checkAvailableSeats);

router.patch('/:booking_id', auth, ownerAuth, BookingController.changeSeat);


export default router;
