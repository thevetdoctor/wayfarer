/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// const Trip = require('../models/trip');
import regeneratorRuntime from 'regenerator-runtime';
import tripQueries from '../helpers/tripQueries';
import db from '../db/connect';


const {
  createTripQuery,
  findBusQuery,
  getAllTripsQuery,
  cancelTripQuery,
  filterQuery,
} = tripQueries;


class TripController {
  static createTrip(req, res) {
    const {
      busId, origin, destination, fare,
    } = req.body;

    // const trip = new Trip(busId, origin, destination, fare);
    const tripDetails = [busId, origin, destination, fare];

    db.query(findBusQuery, [busId])
      .then((result1) => {
        const BusFound = result1.rows[0];

        if (!BusFound) {
          res.status(400).json({
            status: 400,
            error: `Bus with ID ${busId} not registered`,
          });
          return;
        }

        const BusActive = result1.rows.filter(eachBus => eachBus.status === 'active');

        if (BusFound && BusActive.length) {
          res.status(404).json({
            status: 404,
            error: `Bus with ID ${busId} & PLATE-NUMBER ${BusActive[0].plate_number} is already assigned`,
          });
        } else {
          db.query(createTripQuery, tripDetails)
            .then((result2) => {
              res.status(201).json({
                status: 201,
                data: 'Trip created',
              });
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }


  static getTrips(req, res) {
    db.query(getAllTripsQuery)
      .then((result) => {
        if (result.rows.length < 1) {
          res.status(204).json({
            status: 204,
            data: 'No trips available',
          });
        } else {
          const trips = result.rows.map(item => (
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
      })
      .catch(err => console.log(err));
  }


  static cancelTrip(req, res) {
    const { token, userId, isAdmin } = req.body;
    const { tripId } = req.params;


    db.query(cancelTripQuery, ['cancelled', tripId])
      .then((result) => {
        const cancelledTrip = result.rows[0];

        if (!cancelledTrip) {
          res.status(404).json({
            error: 'Trip neither found nor updated',
          });
          return;
        }

        res.status(205).json({
          status: 205,
          message: 'Trip cancelled successfully',
        });
      })
      .catch(err => console.log(err));
  }


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
        const { rows } = await db.query(filterQuery, [origin]);

        if (rows.length > 0) {
          // console.log(rows);
          res.status(200).json({
            status: 200,
            rows,
          });
        } else {
          console.log(`No trips available from ${origin}`);
          res.status(404).json({
            status: 404,
            message: `No trips available from ${origin}`,
          });
        }
        return;
      }

      if (destination && destination !== '' && destination !== undefined) {
        const { rows } = await db.query(filterQuery, [destination]);

        if (rows.length > 0) {
          // console.log(rows);
          res.status(200).json({
            status: 200,
            rows,
          });
        } else {
          console.log(`No trips available to ${destination}`);
          res.status(404).json({
            status: 404,
            message: `No trips available to ${destination}`,
          });
        }
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
