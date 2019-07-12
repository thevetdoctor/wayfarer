/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import db from '../db/connect';
import busQueries from '../helpers/busQueries';


const {
  getBusesQuery,
} = busQueries;

class Bus {
  constructor(numberPlate, manufacturer, model, year, capacity) {
    this.id = null;
    this.numberPlate = numberPlate;
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
        numberPlate: item.numberPlate,
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


module.exports = Bus;
