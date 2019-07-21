/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import regeneratorRuntime from 'regenerator-runtime';
import db from '../db/connect';
import bookingQueries from '../helpers/queries/bookingQueries';


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
  constructor(user_id, trip_id) {
    this.id = null;
    this.trip_id = trip_id;
    this.user_id = user_id;
    this.bus_id = null;
    this.origin = null;
    this.destination = null;
    this.trip_date = null;
    this.seat_number = null;
    this.created_on = null;
  }


  async userCheck(user_id) {
    const { rows } = await db.query(checkUserQuery);
    const foundUser = rows.filter(user => user.id === parseInt(this.user_id, 10));
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


  async checkTrip(trip_id, res) {
    const { rows } = await db.query(getTripsQuery, [this.trip_id]);
    const foundTrip = rows[0];
    return foundTrip;
  }


  async checkBooking(res) {
    const { rows } = await db.query(checkBookingQuery, [this.user_id, this.trip_id]);
    // const tripBooked = rows[0];
    return rows;
  }


  async updateTrip() {
    const { rows } = db.query(updateTripQuery, [this.trip_id]);
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


export default Booking;
