/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import db from '../db/connect';
import bookingQueries from '../helpers/bookingQueries';


const {
  checkUserQuery,
  getTripsQuery,
  checkBookingQuery,
  updateTripQuery,
  bookingQuery,
  getBookingQuery,
  deleteBookingQuery,
  updateTripWithDeletedBookingQuery,
  deletedBookingQuery,
  checkTrip,
  checkSeats,
  checkSeatsOnTrip,
  updateSeatsOnTrip,
  updateSeatsOnBooking,
} = bookingQueries;


class Booking {
  constructor(userId, tripId) {
    this.id = null;
    this.tripId = tripId;
    this.userId = userId;
    this.busId = null;
    this.origin = null;
    this.destination = null;
    this.tripDate = null;
    this.seatNumber = null;
    this.createdOn = null;
  }


  async userCheck(userId) {
    const { rows } = await db.query(checkUserQuery);
    const foundUser = rows.filter(user => user.id === parseInt(this.userId, 10));
    return foundUser;
  }


  static notRegistered(res) {
    return res.status(404).json({
      status: 404,
      error: 'User not registered',
    });
  }

  static notAvailable(res) {
    // console.log(this.userId);
    return res.status(404).json({
      status: 404,
      error: 'Trip is not available',
    });
  }

  static tripCancelled(res) {
    return res.status(404).json({
      status: 404,
      error: 'Trip has been cancelled',
    });
  }


  static fullyBooked(res) {
    return res.status(404).json({
      status: 404,
      error: 'Sorry please, No more empty seats- Trip is fully booked',
    });
  }

  static tripResponse(foundTrip, res) {
    if (!foundTrip) {
      Booking.notAvailable(res);
    }

    if (foundTrip.status === 'cancelled') {
      Booking.tripCancelled(res);
    }

    if (foundTrip.booking_status === foundTrip.capacity) {
      Booking.fullyBooked(res);
    }
    return true;
  }

  static alreadyBooked(res) {
    return res.status(404).json({
      status: 404,
      error: 'You are booked on this trip already',
    });
  }


  async checkTrip(tripId, res) {
    const { rows } = await db.query(getTripsQuery, [this.tripId]);
    const foundTrip = rows[0];
    return foundTrip;
  }


  async checkBooking(res) {
    const { rows } = await db.query(checkBookingQuery, [this.userId, this.tripId]);
    // const tripBooked = rows[0];
    return rows;
  }


  async updateTrip() {
    const { rows } = db.query(updateTripQuery, [this.tripId]);
    return rows;
  }


  static async makeBooking(tripUpdate, completeBookingData, res) {
    const { rows } = await db.query(bookingQuery, completeBookingData);
    const booking = rows[0];

    const data = {
      booking_id: booking.id,
      trip_id: booking.trip_id,
      user_id: booking.user_id,
      bus_id: booking.bus_id,
      origin: booking.origin,
      destination: booking.destination,
      trip_date: tripUpdate.trip_date,
      seat_number: tripUpdate.booking_status,
      message: 'Your trip has been booked',
    };

    res.status(201).json({
      status: 201,
      data,
    });
  }
}


module.exports = Booking;
