/* eslint-disable no-console */
// Import dependencies
import express from 'express';
import path from 'path';
import parser from 'body-parser';
import users from './src/routes/user';
import trips from './src/routes/trip';
import bookings from './src/routes/booking';

// Setup Express server
const app = express();

// Declare PORT
const port = process.env.PORT || 8000;

// Set body parser to make parameter acceptable
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));


// Declare Routes
app.use('/api/v1/auth', users);
app.use('/api/v1/trips', trips);
app.use('/api/v1/bookings', bookings);

// Declare root path
app.get('/api/v1', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/index.html'));
// });

// Initialise Server
app.listen(port, () => {
  console.log(`Server started @ ${port}`);
});


export default app;
