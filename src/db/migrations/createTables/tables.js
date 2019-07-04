const userTable = `CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    email VARCHAR UNIQUE NOT NULL,
                    first_name TEXT NOT NULL,
                    last_name TEXT NOT NULL,
                    password TEXT NOT NULL,
                    is_admin BOOLEAN DEFAULT false,
                    created_on TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                    );`;

const busTable = `CREATE TABLE IF NOT EXISTS buses(
                    id SERIAL PRIMARY KEY,
                    plate_number TEXT UNIQUE NOT NULL,
                    manufacturer TEXT NOT NULL,
                    model TEXT NOT NULL,
                    year TEXT NOT NULL,
                    capacity INT NOT NULL
                    );`;

const tripTable = `CREATE TABLE IF NOT EXISTS trips (
                    id SERIAL PRIMARY KEY,
                    bus_id INT NOT NULL,
                    origin TEXT NOT NULL,
                    destination TEXT NOT NULL,
                    trip_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    fare NUMERIC(10, 2) NOT NULL,
                    status TEXT DEFAULT 'active',
                    booking_status INT DEFAULT 0,
                    passengers TEXT DEFAULT 'none',
                    FOREIGN KEY (bus_id) REFERENCES buses (id)
                    );`;

const bookingTable = `CREATE TABLE IF NOT EXISTS bookings(
                    id SERIAL NOT NULL,
                    trip_id INT NOT NULL,
                    user_id INT NOT NULL,
                    bus_id INT NOT NULL,
                    origin TEXT NOT NULL,
                    destination TEXT NOT NULL,
                    trip_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    seat_number INT DEFAULT 0,
                    created_on TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    PRIMARY KEY(trip_id, user_id),
                    FOREIGN KEY (trip_id) REFERENCES trips (id),
                    FOREIGN KEY (user_id) REFERENCES users (id)
                    );`;

const deletedTable = `CREATE TABLE IF NOT EXISTS deletedbookings (
                        id SERIAL PRIMARY KEY,
                        booking_id INT NOT NULL,
                        trip_id INT NOT NULL,
                        user_id INT NOT NULL,
                        bus_id INT NOT NULL,
                        trip_date TEXT NOT NULL,
                        origin TEXT NOT NULL,
                        destination TEXT NOT NULL,
                        seat_number INT NOT NULL,
                        deleted_on TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                        );`;

const allTables = `${userTable}${busTable}${tripTable}${bookingTable}${deletedTable}`;

module.exports = allTables;
