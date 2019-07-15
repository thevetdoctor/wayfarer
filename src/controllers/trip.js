/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
// import regeneratorRuntime from 'regenerator-runtime';
import tripQueries from '../helpers/queries/tripQueries';
import Trip from '../models/trip';
// import db from '../db/connect';


const {
  cancelTripQuery,
  filterQuery,
} = tripQueries;

const seats = (busCapacity) => {
  const arr = [];
  for (let i = 1; i <= busCapacity; i++) {
    arr.push(i);
  }
  return arr;
};

class TripController {
  // 1. create a new trip
  static createTrip(req, res) {
    // const { token, user_id, is_admin } = req.body;
    const {
      bus_id, origin, destination, fare,
    } = req.body;

    const trip = new Trip(bus_id, origin, destination, fare);

    trip.findBus(trip.bus_id, res)
      .then((bus) => {
        if (!bus.length) {
          res.status(400).json({
            status: 400,
            error: `Bus with ID ${trip.bus_id} not registered`,
          });
        } else {
          const tripActive = bus.filter(eachtrip => eachtrip.status === 'active');
          if (tripActive.length) {
            return trip.alreadyAssigned(tripActive, res);
          }
          console.log(seats(bus[0].capacity));
          trip.details = [trip.bus_id, trip.origin, trip.destination, trip.fare, seats(bus[0].capacity), []];
          trip.create(trip.details, res);
        }
      });
  }


  // 2. get a list of all trips
  static getTrips(req, res) {
    Trip.getAll()
      .then((trips) => {
        // console.log(trips);
        if (trips.length < 1) {
          res.status(204).json({
            status: 204,
            data: 'No trips available',
          });
        } else {
          Trip.showAll(trips, res);
        }
      });
  }


  // 3. cancel an active trip
  static cancelTrip(req, res) {
    const { token, user_id, is_admin } = req.body;
    const { trip_id } = req.params;

    Trip.checkCancelled(trip_id, res);
  }


  // 4. filter trips based on origin & destination
  static async filterTrip(req, res) {
    const { token, user_id, is_admin } = req.body;
    const { search } = req.params;
    const { origin, destination } = req.query;

    // console.log(req.params);
    // console.log(req.query);
    // console.log('origin', origin);
    // console.log('destination', destination);

    if (search && search === 'search') {
      if (origin && origin !== '' && origin !== undefined) {
        Trip.filter(origin, res);
        return;
      }

      if (destination && destination !== '' && destination !== undefined) {
        Trip.filter(destination, res);
        return;
      }
      res.status(400).json({
        status: 400,
        error: 'No search query',
      });
      return;
    }
    res.status(400).json({
      status: 400,
      error: 'Incorrect search parameter',
    });
  }
}


module.exports = TripController;
