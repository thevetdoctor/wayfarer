"use strict";

module.exports = {
  //   booking queries
  checkUserQuery: 'SELECT id FROM users',
  getTripsQuery: "SELECT * FROM trips INNER JOIN buses\n                  ON trips.bus_id = buses.id\n                  WHERE trips.id = $1",
  checkBookingQuery: "SELECT * FROM bookings INNER JOIN users\n                      ON bookings.user_id = users.id\n                      WHERE user_id = $1\n                      AND trip_id = $2",
  updateTripQuery: "UPDATE trips\n                    SET booking_status = booking_status + 1,\n                        free_seats = free_seats[2: array_length(free_seats, 1)],\n                        booked_seats[array_length(booked_seats, 1) + 1] = free_seats[1],\n                        passengers = array_length(booked_seats, 1) + 1\n                    WHERE id = $1 RETURNING *",
  bookingQuery: "INSERT INTO bookings (\n                    user_id, trip_id, bus_id, origin,\n                    destination, trip_date,\n                    seat_number)\n                 VALUES ($1, $2, $3, $4, $5, $6, $7)\n                 RETURNING *",
  getBookingQuery: "SELECT bookings.id, bookings.trip_id, bookings.user_id,\n                        bookings.bus_id, bookings.origin, bookings.destination,\n                        bookings.trip_date, bookings.seat_number, users.first_name,\n                        users.last_name, users.email\n                    FROM bookings INNER JOIN users ON bookings.user_id = users.id\n                    ORDER BY bookings.id\n                    DESC",
  deleteBookingQuery: 'DELETE FROM bookings WHERE id = $1 RETURNING *',
  updateTripWithDeletedBookingQuery: 'UPDATE trips set booking_status = booking_status - $1 WHERE id = $2',
  deletedBookingQuery: "INSERT INTO deletedbookings (\n                        booking_id, trip_id, user_id, bus_id, trip_date, origin,\n                        destination, seat_number, deleted_on)\n                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
  checkTrip: 'SELECT trip_id, origin, destination, seat_number FROM bookings WHERE id = $1 AND user_id = $2',
  checkSeats: 'SELECT trips.id, trips.free_seats, trips.booked_seats, buses.capacity FROM trips INNER JOIN buses ON trips.bus_id = buses.id WHERE trips.id = $1',
  checkSeatsOnTrip: 'SELECT trips.free_seats, trips.booked_seats, buses.capacity FROM trips INNER JOIN buses ON trips.bus_id = buses.id WHERE trips.id = $1',
  updateSeatsOnTrip: 'UPDATE trips SET booking_status = $1, free_seats = $2, booked_seats = $3, passengers = $1 WHERE id = $4 RETURNING *',
  updateSeatsOnBooking: 'UPDATE bookings SET seat_number = $1 WHERE id = $2'
};