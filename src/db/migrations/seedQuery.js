const { getHash } = require('../../helpers/hashToken');

const usersQuery = `INSERT INTO users (
                email, first_name, last_name, password, is_admin)
                VALUES ('oba@gmail.com', 'oba', 'femi', '${getHash('pass1')}', true);
               INSERT INTO users (
                email, first_name, last_name, password)
                VALUES ('dami@gmail.com', 'dami', 'lola', '${getHash('pass2')}');
               INSERT INTO users (
                email, first_name, last_name, password)
                VALUES ('demi@gmail.com', 'demi', 'lade', '${getHash('pass3')}');
               INSERT INTO users (
                email, first_name, last_name, password)
                VALUES ('oye@gmail.com', 'oye', 'toke', '${getHash('pass4')}');`;


const busesQuery = `INSERT INTO buses (
                    plate_number, manufacturer, model, year, capacity)
                    VALUES ('SMK584AZ', 'KIA', 'CERATO', '2010', 5);
                    INSERT INTO buses (
                    plate_number, manufacturer, model, year, capacity)
                    VALUES ('SMK787EQ', 'TOYOTA', 'COROLLA', '2010', 5);
                    INSERT INTO buses (
                    plate_number, manufacturer, model, year, capacity)
                    VALUES ('LND657AZ', 'VOLKSWAGEN', 'GOLF', '1999', 5);
                    INSERT INTO buses (
                    plate_number, manufacturer, model, year, capacity)
                    VALUES ('EKY06CC', 'TOYOTA', 'SIENNA', '2000', 8);`;

const tripsQuery = `INSERT INTO trips (
                    bus_id, origin, destination, fare, status, booking_status)
                    VALUES (1, 'IBADAN', 'LAGOS', 2000, 'cancelled', 1);
                    INSERT INTO trips (
                    bus_id, origin, destination, fare, booking_status)
                    VALUES (2, 'OSOGBO', 'LAGOS', 2000, 1);
                    INSERT INTO trips (
                    bus_id, origin, destination, fare, status, booking_status)
                    VALUES (3, 'IBADAN', 'BENIN', 2000, 'cancelled', 1);
                    INSERT INTO trips (
                    bus_id, origin, destination, fare, booking_status)
                    VALUES (4, 'IBADAN', 'ABUJA', 2000, 1);
                    INSERT INTO trips (
                    bus_id, origin, destination, fare, booking_status)
                    VALUES (4, 'LAGOS', 'PORTHARCOURT', 2000, 8);`;


const bookingsQuery = `INSERT INTO bookings (
                        trip_id, user_id, bus_id, origin, destination, seat_number)
                        VALUES (1, 4, 1, 'IBADAN', 'LAGOS', 1);
                        INSERT INTO bookings (
                        trip_id, user_id, bus_id, origin, destination, seat_number)
                        VALUES (2, 3, 2, 'OSOGBO', 'LAGOS', 1);
                        INSERT INTO bookings (
                        trip_id, user_id, bus_id, origin, destination, seat_number)
                        VALUES (3, 2, 3, 'IBADAN', 'BENIN', 1);
                        INSERT INTO bookings (
                        trip_id, user_id, bus_id, origin, destination, seat_number)
                        VALUES (4, 1, 4, 'IBADAN', 'ABUJA', 1);
                        INSERT INTO bookings (
                        trip_id, user_id, bus_id, origin, destination, seat_number)
                        VALUES (5, 1, 4, 'LAGOS', 'PORTHARCOURT', 1);`;


const seedTableQuery = `${usersQuery}${busesQuery}${tripsQuery}${bookingsQuery}`;


module.exports = seedTableQuery;
