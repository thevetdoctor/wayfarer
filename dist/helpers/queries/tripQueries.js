"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  //   trip queries
  createTripQuery: 'INSERT INTO trips (bus_id, origin, destination, fare, free_seats, booked_seats) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
  findBusQuery: 'SELECT * FROM trips INNER JOIN buses ON trips.bus_id = buses.id WHERE bus_id = $1',
  getAllTripsQuery: 'SELECT * FROM trips ORDER BY id DESC',
  checkTripQuery: 'SELECT * FROM trips WHERE id = $1',
  cancelTripQuery: 'UPDATE trips SET status = $1 WHERE id = $2 RETURNING *',
  filterByOriginQuery: "SELECT trips.id, trips.bus_id, trips.origin, trips.destination, trips.trip_date,\n                        trips.fare, trips.passengers, buses.model, buses.capacity\n                        FROM trips\n                        INNER JOIN buses\n                        ON trips.bus_id = buses.id\n                        WHERE trips.status = 'active'\n                        AND trips.origin = $1;",
  filterByDestinationQuery: "SELECT trips.id, trips.bus_id, trips.origin, trips.destination, trips.trip_date,\n                        trips.fare, trips.passengers, buses.model, buses.capacity\n                        FROM trips\n                        INNER JOIN buses\n                        ON trips.bus_id = buses.id\n                        WHERE trips.status = 'active'\n                        AND trips.destination = $1;"
};
exports["default"] = _default;