/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// const Trip = require('../models/trip');
import tripQueries from '../helpers/tripQueries';
import db from '../db/connect';

const { createTripQuery, findBusQuery } = tripQueries;


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
}


module.exports = TripController;
