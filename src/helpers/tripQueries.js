export default {

  //   trip queries
  createTripQuery: 'INSERT INTO trips (bus_id, origin, destination, fare) VALUES ($1, $2, $3, $4) RETURNING *',

  findBusQuery: 'SELECT * FROM trips INNER JOIN buses ON trips.bus_id = buses.id WHERE bus_id = $1',

  getAllTripsQuery: 'SELECT * FROM trips ORDER BY id DESC',

  filterQuery: 'SELECT * FROM trips INNER JOIN buses ON trips.bus_id = buses.id WHERE trips.origin = $1',
};
