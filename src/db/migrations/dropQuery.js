const dropUsersTable = 'DROP TABLE IF EXISTS users CASCADE;';
const dropBusesTable = 'DROP TABLE IF EXISTS buses CASCADE;';
const dropTripsTable = 'DROP TABLE IF EXISTS trips CASCADE;';
const dropBookingsTable = 'DROP TABLE IF EXISTS bookings CASCADE;';
const dropDeletedBookingsTable = 'DROP TABLE IF EXISTS deletedbookings CASCADE;';

const dropTableQuery = `${dropUsersTable}${dropBusesTable}${dropTripsTable}${dropBookingsTable}${dropDeletedBookingsTable}`;

module.exports = dropTableQuery;
