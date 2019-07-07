/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import bookingQueries from '../helpers/bookingQueries';
// import Booking from '../models/booking';
import db from '../db/connect';

const {
  checkUser, getTripsQuery, checkBookingQuery, updateTripQuery, bookingQuery, getBookingQuery, deleteBookingQuery, updateTripWithDeletedBookingQuery, deletedBookingQuery, checkTrip, checkSeats, checkSeatsOnTrip, updateSeatsOnTrip, updateSeatsOnBooking,
} = bookingQueries;


class BookingController {
  static createBooking(req, res) {
    const {
      token, userId, isAdmin, tripId,
    } = req.body;

    // const newBooking = new Booking(userId, tripId);
    const updateData = [tripId];
    const bookingData = [userId, tripId];


    db.query(checkUser)
      .then((result) => {
        const foundUser = result.rows.filter(user => user.id === parseInt(userId, 10));
        if (foundUser.length < 1) {
          res.status(404).json({
            status: 404,
            error: 'User not registered',
          });
          return;
        }

        db.query(getTripsQuery, [tripId])
          .then((result1) => {
            const foundTrip = result1.rows[0];

            if (!foundTrip) {
              res.status(404).json({
                status: 404,
                error: 'Trip is not available',
              });
              return;
            }

            if (foundTrip.status === 'cancelled') {
              res.status(404).json({
                status: 404,
                error: 'Trip has been cancelled',
              });
              return;
            }

            if (foundTrip.booking_status === foundTrip.capacity) {
              res.status(404).json({
                status: 404,
                error: 'Sorry please, No more empty seats- Trip is fully booked',
              });
              return;
            }


            db.query(checkBookingQuery, bookingData)
              .then((result2) => {
                const tripBooked = result2.rows[0];


                if (tripBooked) {
                  res.status(404).json({
                    status: 404,
                    error: 'You are booked on this trip already',
                  });
                  return;
                }

                db.query(updateTripQuery, updateData)
                  .then((result3) => {
                    const tripUpdate = result3.rows[0];
                    const seatNo = tripUpdate.booked_seats[tripUpdate.booked_seats.length - 1];
                    console.log(seatNo);

                    const moreBookingData = [foundTrip.bus_id, foundTrip.origin, foundTrip.destination, tripUpdate.trip_date, seatNo];
                    const completeBookingData = [...bookingData, ...moreBookingData];

                    db.query(bookingQuery, completeBookingData)
                      .then((result4) => {
                        const booking = result4.rows[0];

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
                      })
                      .catch(err => console.log(err));
                  })
                  .catch(err => console.log(err));
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }


  static getBookings(req, res) {
    const { token, userId, isAdmin } = req.body;

    db.query(getBookingQuery)
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
            trip_id: item.trip_id,
            user_id: item.user_id,
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
    const { token, userId, isAdmin } = req.body;
    const { bookingId } = req.params;

    // console.log(bookingId, userId);

    const checkData = [userId, bookingId];


    db.query(checkBookingQuery, checkData)
      .then((result1) => {
        if (result1.rows.length < 1) {
          res.status(404).json({
            status: 404,
            error: 'No such booking found',
          });
          return;
        }

        db.query(deleteBookingQuery, [bookingId])
          .then((result2) => {
            const data = result2.rows[0];
            // console.log(data);

            if (data === undefined) {
              res.status(404).json({
                status: 404,
                error: 'Booking found but not deleted',
              });
              return;
            }
            // console.log('tripId', result1.rows[0].trip_id);
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
                      message: 'Booking deleted successfully',
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
    const { token, userId, isAdmin } = req.body;
    const { bookingId } = req.params;

    const { rows } = await db.query(checkTrip, [bookingId, 1]);

    if (rows.length) {
      console.log('bookingId ->', bookingId);
      console.log('tripId ->', rows[0].trip_id);

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
    const { tripId } = req.body;
    let { oldSeatNumber, newSeatNumber } = req.body;
    const { bookingId } = req.params;
    oldSeatNumber = parseInt(oldSeatNumber, 10);
    newSeatNumber = parseInt(newSeatNumber, 10);

    const { rows } = await db.query(checkSeatsOnTrip, [tripId]);

    // console.log('old seat number', oldSeatNumber);
    // console.log('new seat number', newSeatNumber);

    if (rows.length) {
      const freeSeats = rows[0].free_seats;
      const bookedSeats = rows[0].booked_seats;
      // console.log('free seats', freeSeats);
      // console.log('booked seats', bookedSeats);

      if (!bookedSeats.filter(item => item === oldSeatNumber).length) {
        console.log('Your old seat number not found in booked seats!');
        res.status(404).json({
          status: 404,
          error: 'Seat number not found',
        });
        return;
      }
      if (freeSeats.filter(item => item === newSeatNumber).length) {
        freeSeats.splice(freeSeats.indexOf(newSeatNumber), 1, oldSeatNumber);
        bookedSeats.splice(bookedSeats.indexOf(oldSeatNumber), 1, newSeatNumber);

        // console.log(oldSeatNumber, newSeatNumber);
        // console.log(freeSeats.filter(item => item === newSeatNumber));
        // console.log(freeSeats.filter(item => item === oldSeatNumber));
        // console.log(freeSeats, bookedSeats);
        const updateTrip = await db.query(updateSeatsOnTrip, [bookedSeats.length, freeSeats, bookedSeats, tripId]);

        console.log(updateTrip.rows);

        const seatChanged = await db.query(updateSeatsOnBooking, [newSeatNumber, bookingId]);
        if (seatChanged) {
          res.status(200).json({
            status: 200,
            data: rows[0],
            message: `Your seat number has been changed from ${oldSeatNumber} to ${newSeatNumber}`,
          });
        }
      } else {
        res.status(404).json({
          status: 404,
          error: 'Please reconfirm ew seat number, the seat may have just been taken!',
        });
      }
    }
  }
}


module.exports = BookingController;
