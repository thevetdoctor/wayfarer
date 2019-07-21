/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable camelcase */
import bookingQueries from '../helpers/queries/bookingQueries';
import Booking from '../models/booking';
import db from '../db/connect';

const {
  checkUserQuery,
  getTripsQuery,
  updateTripQuery,
  bookingQuery,
  checkBookingQuery,
  getBookingQuery,
  checkBookingsForUserQuery,
  checkBookingForAdminQuery,
  checkBookingForUserQuery,
  deleteBookingQuery,
  updateTripWithDeletedBookingQuery,
  deletedBookingQuery,
  checkTripByAdmin,
  checkTrip,
  checkSeats,
  checkSeatsOnTrip,
  updateSeatsOnTrip,
  updateSeatsOnBooking,
} = bookingQueries;


class BookingController {
  static async createBooking(req, res) {
    console.log('enter create booking');
    const { trip_id } = req.body;
    const user_id = req.token.id;

    const booking = new Booking(user_id, trip_id);
    const bookingData = [user_id, trip_id];

    try {
      const foundUser = await booking.userCheck(user_id, res);

      const rows = await booking.checkTrip(trip_id, res);

      if (rows.length < 1) {
        return Booking.notAvailable(res);
      }

      const foundTrip = rows[0];
      if (foundTrip.status === 'cancelled') {
        return Booking.tripCancelled(res);
      }

      if (foundTrip.booking_status === foundTrip.capacity) {
        return Booking.fullyBooked(res);
      }

      const booked = await booking.checkBooking(user_id, trip_id);

      if (booked[0]) {
        return Booking.alreadyBooked(res);
      }

      const update = await booking.updateTrip(updateTripQuery, [trip_id]);
      const tripUpdate = update[0];
      const seatNo = tripUpdate.booked_seats[tripUpdate.booked_seats.length - 1];
      console.log('seat no', seatNo);

      const moreBookingData = [foundTrip.bus_id, foundTrip.origin, foundTrip.destination, tripUpdate.trip_date, seatNo];
      const completeBookingData = [...bookingData, ...moreBookingData];

      console.log('exit create booking');
      const newBooking = await booking.makeBooking(tripUpdate, completeBookingData, res);
      return Booking.newBooking(newBooking, res);
    } catch (err) {
      return res.status(500).json({
        status: 500,
        err,
      });
    }
  }


  static getBookings(req, res) {
    const { id, is_admin } = req.token;
    const user_id = id;

    console.log(user_id, is_admin);
    let query;
    if (is_admin) {
      query = [getBookingQuery];
    } else {
      query = [checkBookingsForUserQuery, [user_id]];
    }

    db.query(...query)
      .then((result) => {
        if (result.rows.length < 1) {
          res.status(404).json({
            status: 404,
            error: 'No bookings on record',
          });
          return;
        }

        const data = result.rows.map(item => (
          {
            booking_id: item.id,
            user_id: item.user_id,
            trip_id: item.trip_id,
            bus_id: item.bus_id,
            origin: item.origin,
            destination: item.destination,
            trip_date: item.created_on,
            seat_number: item.seat_number,
            first_name: item.first_name,
            last_name: item.last_name,
            email: item.email,
          }
        ));

        res.status(200).json({
          status: 200,
          data,
        });
      })
      .catch(err => console.log(err));
  }


  static deleteBooking(req, res) {
    const { booking_id } = req.params;
    const { id, is_admin } = req.token;
    const user_id = id;

    // console.log('user_id:', id, ', is_admin:', is_admin);
    const checkData = [user_id, booking_id];

    let query;
    if (is_admin) {
      query = [checkBookingForAdminQuery, [booking_id]];
    } else {
      query = [checkBookingForUserQuery, checkData];
    }


    db.query(...query)
      .then((result1) => {
        if (result1.rows.length < 1) {
          res.status(404).json({
            status: 404,
            error: 'No such booking found',
          });
          return;
        }

        db.query(deleteBookingQuery, [booking_id])
          .then((result2) => {
            const data = result2.rows[0];
            const updateTripWithDeletedBookingData = [1, result1.rows[0].trip_id];

            db.query(updateTripWithDeletedBookingQuery, updateTripWithDeletedBookingData)
              .then((result3) => {
                const deleted = result3.rows;
                // console.log(deleted);

                const deletedBookingData = Object.values(data);
                // console.log(deletedBookingData);

                db.query(deletedBookingQuery, deletedBookingData)
                  .then((result4) => {
                    // console.log(result4.rows);

                    res.status(200).json({
                      status: 200,
                      data: {
                        message: 'Booking deleted successfully',
                      },
                    });
                  })
                  .catch(err => console.log(err));
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  static async checkAvailableSeats(req, res) {
    const { id, is_admin } = req.token;
    const { booking_id } = req.params;
    const user_id = parseInt(id, 10);


    let query;
    if (is_admin) {
      query = [checkTripByAdmin, [booking_id]];
    } else {
      query = [checkTrip, [booking_id, user_id]];
    }

    const { rows } = await db.query(...query);
    console.log(user_id, rows);


    if (rows.length) {
      console.log('booking_id ->', booking_id);
      console.log('trip_id ->', rows[0].trip_id);

      const seats = await db.query(checkSeats, [rows[0].trip_id]);

      const oldSeatNumber = rows[0].seat_number;
      console.log('old seat number', oldSeatNumber);

      if (seats.rows.length) {
        const freeSeats = seats.rows[0].free_seats;
        const bookedSeats = seats.rows[0].booked_seats;
        console.log('free seats', freeSeats);
        console.log('booked seats', bookedSeats);
        let availableSeats = seats.rows[0].capacity - seats.rows[0].booked_seats.length;
        availableSeats = availableSeats > 0 ? `${seats.rows[0].free_seats.length} seats available! ` : 'Seats gone';


        res.status(200).json({
          status: 200,
          tripId: seats.rows[0].id,
          yourSeatNumber: oldSeatNumber,
          freeSeats,
          bookedSeats,
          availableSeats,
        });
      }
    } else {
      console.log('Booking not found!');
      res.status(404).json({
        status: 404,
        error: 'Booking not found!',
      });
    }
  }


  static async changeSeat(req, res) {
    const { trip_id } = req.body;
    let { old_seat_number, new_seat_number } = req.body;
    const { booking_id } = req.params;
    old_seat_number = parseInt(old_seat_number, 10);
    new_seat_number = parseInt(new_seat_number, 10);

    const { rows } = await db.query(checkSeatsOnTrip, [trip_id]);

    // console.log('old seat number', oldSeatNumber);
    // console.log('new seat number', newSeatNumber);

    if (rows.length) {
      const freeSeats = rows[0].free_seats;
      const bookedSeats = rows[0].booked_seats;
      // console.log('free seats', freeSeats);
      // console.log('booked seats', bookedSeats);

      if (!bookedSeats.filter(item => item === old_seat_number).length) {
        console.log('Your old seat number not found in booked seats!');
        res.status(404).json({
          status: 404,
          error: 'Seat number not found',
        });
        return;
      }
      if (freeSeats.filter(item => item === new_seat_number).length) {
        freeSeats.splice(freeSeats.indexOf(new_seat_number), 1, old_seat_number);
        bookedSeats.splice(bookedSeats.indexOf(old_seat_number), 1, new_seat_number);

        // console.log(oldSeatNumber, newSeatNumber);
        // console.log(freeSeats.filter(item => item === newSeatNumber));
        // console.log(freeSeats.filter(item => item === oldSeatNumber));
        // console.log(freeSeats, bookedSeats);
        const updateTrip = await db.query(updateSeatsOnTrip, [bookedSeats.length, freeSeats, bookedSeats, trip_id]);

        // console.log(updateTrip.rows);

        const seatChanged = await db.query(updateSeatsOnBooking, [new_seat_number, booking_id]);
        if (seatChanged) {
          res.status(200).json({
            status: 200,
            data: rows[0],
            message: `Your seat number has been changed from ${old_seat_number} to ${new_seat_number}`,
          });
        }
      } else {
        res.status(404).json({
          status: 404,
          error: 'Please reconfirm new seat number, the seat may have just been taken!',
        });
      }
    }
  }
}


module.exports = BookingController;
