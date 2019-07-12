/* eslint-disable no-console */
import Bus from '../models/bus';


class BusController {
  // 1. get a list of all buses
  static getBuses(req, res) {
    Bus.getAll()
      .then((buses) => {
        // console.log(buses);
        if (buses.length < 1) {
          res.status(204).json({
            status: 204,
            data: 'No trips available',
          });
        } else {
          Bus.showAll(buses, res);
        }
      });
  }
}


module.exports = BusController;
