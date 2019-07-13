/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import db from '../db/connect';
import tripQueries from '../helpers/tripQueries';


const {
  createTripQuery,
  findBusQuery,
  getAllTripsQuery,
  checkTripQuery,
  cancelTripQuery,
  filterByOriginQuery,
  filterByDestinationQuery,
} = tripQueries;


class Trip {
  constructor(busId, origin, destination, fare) {
    this.id = null;
    this.busId = busId;
    this.origin = origin;
    this.destination = destination;
    this.tripDate = null;
    this.fare = fare;
    this.status = null;
  }


  async findBus(busId) {
    // const tripDetails = [busId, origin, destination, fare];

    const { rows } = await db.query(findBusQuery, [this.busId]);
    // const busFound = rows[0];
    return rows;
  }


  alreadyAssigned(bus, res) {
    // //
    return res.status(404).json({
      status: 404,
      error: `Bus with ID ${this.busId} & PLATE-NUMBER ${bus[0].plate_number} is already assigned`,
    });
  }


  async create(details, res) {
    const { rows } = await db.query(createTripQuery, this.details);
    console.log('rows', rows);
    return res.status(201).json({
      status: 201,
      data: 'Trip created',
    });
  }


  static async getAll() {
    const { rows } = await db.query(getAllTripsQuery);

    return rows;
  }


  static showAll(rows, res) {
    const trips = rows.map(item => (
      {
        trip_id: item.id,
        bus_id: item.bus_id,
        origin: item.origin,
        destination: item.destination,
        trip_date: item.trip_date,
        booking_status: item.booking_status,
        free_seats: item.free_seats,
        booked_seats: item.booked_seats,
        passengers: item.passengers,
        fare: item.fare,
        status: item.status,
      }));

    res.status(200).json({
      status: 200,
      data: trips,
    });
  }

  static async checkCancelled(tripId, res) {
    const checkedTrip = await db.query(checkTripQuery, [tripId]);
    console.log('checking', checkedTrip.rows.length);
    if (checkedTrip.rows.length < 1) {
      res.status(404).json({
        status: 404,
        error: 'Trip not found',
      });
      return;
    }
    if (checkedTrip.rows[0].status === 'cancelled') {
      res.status(404).json({
        status: 404,
        error: 'Already cancelled',
      });
      return;
    }
    const { rows } = await db.query(cancelTripQuery, ['cancelled', tripId]);

    console.log('updated', rows);
    if (!rows) {
      res.status(404).json({
        status: 404,
        error: 'Trip neither found nor updated',
      });
      return;
    }

    res.status(205).json({
      status: 205,
      message: 'Trip cancelled successfully',
    });
  }

  static async filter(origin = 'origin', res) {
    const { rows } = await db.query(filterByOriginQuery, [origin]);

    if (rows.length > 0) {
      console.log(origin);
      res.status(200).json({
        status: 200,
        rows,
      });
    } else {
      const from = origin === 'origin' ? 'from' : 'to';
      console.log(`No trips available ${from} ${origin}`);
      res.status(404).json({
        status: 404,
        message: `No trips available ${from} ${origin}`,
      });
    }
  }
}


module.exports = Trip;
