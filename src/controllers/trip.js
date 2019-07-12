/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// import regeneratorRuntime from 'regenerator-runtime';
import tripQueries from '../helpers/tripQueries';
import Trip from '../models/trip';
// import db from '../db/connect';


const {
  cancelTripQuery,
  filterQuery,
} = tripQueries;


class TripController {
  // 1. create a new trip
  static createTrip(req, res) {
    const {
      busId, origin, destination, fare,
    } = req.body;

    const trip = new Trip(busId, origin, destination, fare);

    trip.findBus(trip.busId, res)
      .then((bus) => {
        if (!bus.length) {
          res.status(400).json({
            status: 400,
            error: `Bus with ID ${trip.busId} not registered`,
          });
        } else {
          const tripActive = bus.filter(eachtrip => eachtrip.status === 'active');
          if (tripActive.length) {
            return trip.alreadyAssigned(tripActive, res);
          }
          trip.details = [trip.busId, trip.origin, trip.destination, trip.fare];
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
    const { token, userId, isAdmin } = req.body;
    const { tripId } = req.params;

    Trip.checkCancelled(tripId, res);
  }


  // 4. filter trips based on origin & destination
  static async filterTrip(req, res) {
    const { token, userId, isAdmin } = req.body;
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
