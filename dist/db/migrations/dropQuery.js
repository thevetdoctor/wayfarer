"use strict";

var dropUsersTable = 'DROP TABLE IF EXISTS users CASCADE;';
var dropBusesTable = 'DROP TABLE IF EXISTS buses CASCADE;';
var dropTripsTable = 'DROP TABLE IF EXISTS trips CASCADE;';
var dropBookingsTable = 'DROP TABLE IF EXISTS bookings CASCADE;';
var dropDeletedBookingsTable = 'DROP TABLE IF EXISTS deletedbookings CASCADE;';
var dropTableQuery = "".concat(dropUsersTable).concat(dropBusesTable).concat(dropTripsTable).concat(dropBookingsTable).concat(dropDeletedBookingsTable);
module.exports = dropTableQuery;