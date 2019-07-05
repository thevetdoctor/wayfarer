/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import bookingQueries from '../helpers/bookingQueries';
// import Booking from '../models/booking';
import db from '../db/connect';

const {
  checkUser, getTripsQuery, checkBookingQuery, updateTripQuery, bookingQuery, getBookingQuery, deleteBookingQuery, updateTripWithDeletedBookingQuery, deletedBookingQuery,
} = bookingQueries;


class BookingController {
  static createBooking(req, res) {
    const {
      token, userId, isAdmin, tripId,
    } = req.body;

    // const newBooking = new Booking(userId, tripId);
    const updateData = [1, tripId];
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

                    const moreBookingData = [foundTrip.bus_id, foundTrip.origin, foundTrip.destination, tripUpdate.trip_date, tripUpdate.booking_status];
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
}


module.exports = BookingController;
