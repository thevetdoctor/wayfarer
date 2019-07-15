module.exports = {

  //   booking queries
  checkUserQuery: 'SELECT id, email, first_name, last_name FROM users',

  getTripsQuery: `SELECT * FROM trips INNER JOIN buses
                  ON trips.bus_id = buses.id
                  WHERE trips.id = $1`,

  checkBookingQuery: `SELECT * FROM bookings INNER JOIN users
                      ON bookings.user_id = users.id
                      WHERE user_id = $1
                      AND trip_id = $2`,

  updateTripQuery: `UPDATE trips
                    SET booking_status = booking_status + 1,
                        free_seats = free_seats[2: array_length(free_seats, 1)],
                        booked_seats[array_length(booked_seats, 1) + 1] = free_seats[1],
                        passengers = array_length(booked_seats, 1) + 1
                    WHERE id = $1 RETURNING *`,

  bookingQuery: `INSERT INTO bookings (
                    user_id, trip_id, bus_id, origin,
                    destination, trip_date,
                    seat_number)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)
                 RETURNING *`,

  getBookingQuery: `SELECT bookings.id, bookings.trip_id, bookings.user_id,
                        bookings.bus_id, bookings.origin, bookings.destination,
                        bookings.trip_date, bookings.seat_number, users.first_name,
                        users.last_name, users.email
                    FROM bookings INNER JOIN users ON bookings.user_id = users.id
                    ORDER BY bookings.id
                    DESC`,

  checkBookingsForUserQuery: `SELECT bookings.id, bookings.trip_id, bookings.user_id,
                        bookings.bus_id, bookings.origin, bookings.destination,
                        bookings.trip_date, bookings.seat_number, users.first_name,
                        users.last_name, users.email
                    FROM bookings INNER JOIN users ON bookings.user_id = users.id
                    WHERE user_id = $1
                    ORDER BY bookings.id
                    DESC`,

  checkBookingForAdminQuery: `SELECT * FROM bookings INNER JOIN users
                      ON bookings.user_id = users.id
                      WHERE bookings.id = $1`,

  checkBookingForUserQuery: `SELECT * FROM bookings INNER JOIN users
                      ON bookings.user_id = users.id
                      WHERE user_id = $1
                      AND bookings.id = $2`,

  deleteBookingQuery: 'DELETE FROM bookings WHERE id = $1 RETURNING *',

  updateTripWithDeletedBookingQuery: 'UPDATE trips set booking_status = booking_status - $1 WHERE id = $2',

  deletedBookingQuery: `INSERT INTO deletedbookings (
                        booking_id, trip_id, user_id, bus_id, trip_date, origin,
                        destination, seat_number, deleted_on)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,

  checkTripByAdmin: 'SELECT trip_id, origin, destination, seat_number FROM bookings WHERE id = $1',

  checkTrip: 'SELECT trip_id, origin, destination, seat_number FROM bookings WHERE id = $1 AND user_id = $2',

  checkSeats: 'SELECT trips.id, trips.free_seats, trips.booked_seats, buses.capacity FROM trips INNER JOIN buses ON trips.bus_id = buses.id WHERE trips.id = $1',

  checkSeatsOnTrip: 'SELECT trips.free_seats, trips.booked_seats, buses.capacity FROM trips INNER JOIN buses ON trips.bus_id = buses.id WHERE trips.id = $1',

  updateSeatsOnTrip: 'UPDATE trips SET booking_status = $1, free_seats = $2, booked_seats = $3, passengers = $1 WHERE id = $4 RETURNING *',

  updateSeatsOnBooking: 'UPDATE bookings SET seat_number = $1 WHERE id = $2',
};
