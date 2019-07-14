/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import regeneratorRuntime from 'regenerator-runtime';
import db from '../db/connect';
import busQueries from '../helpers/queries/busQueries';


const {
  getBusesQuery,
} = busQueries;

class Bus {
  constructor(number_plate, manufacturer, model, year, capacity) {
    this.id = null;
    this.number_plate = number_plate;
    this.manufacturer = manufacturer;
    this.model = model;
    this.year = year;
    this.capacity = capacity;
  }


  static async getAll() {
    const { rows } = await db.query(getBusesQuery);

    return rows;
  }


  static showAll(rows, res) {
    const buses = rows.map(item => (
      {
        bus_id: item.id,
        number_plate: item.number_plate,
        manufacturer: item.manufacturer,
        model: item.model,
        year: item.year,
        capacity: item.capacity,
      }));

    res.status(200).json({
      status: 200,
      data: buses,
    });
  }
}


export default Bus;
