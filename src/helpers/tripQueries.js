export default {

  //   trip queries
  createTripQuery: 'INSERT INTO trips (bus_id, origin, destination, fare) VALUES ($1, $2, $3, $4) RETURNING *',

  findBusQuery: 'SELECT * FROM trips INNER JOIN buses ON trips.bus_id = buses.id WHERE bus_id = $1',

  getAllTripsQuery: 'SELECT * FROM trips ORDER BY id DESC',

  checkTripQuery: 'SELECT * FROM trips WHERE id = $1',

  cancelTripQuery: 'UPDATE trips SET status = $1 WHERE id = $2 RETURNING *',

  filterByOriginQuery: `SELECT trips.id, trips.bus_id, trips.origin, trips.destination, trips.trip_date,
                        trips.fare, trips.passengers, buses.model, buses.capacity
                        FROM trips
                        INNER JOIN buses
                        ON trips.bus_id = buses.id
                        WHERE trips.status = 'active'
                        AND trips.origin = $1;`,

  filterByDestinationQuery: `SELECT trips.id, trips.bus_id, trips.origin, trips.destination, trips.trip_date,
                        trips.fare, trips.passengers, buses.model, buses.capacity
                        FROM trips
                        INNER JOIN buses
                        ON trips.bus_id = buses.id
                        WHERE trips.status = 'active'
                        AND trips.destination = $1;`,

};
