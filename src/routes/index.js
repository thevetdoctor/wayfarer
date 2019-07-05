import users from './user';
import trips from './trip';
import bookings from './booking';


export default (app) => {
  // Declare Routes
  app.use('/api/v1/auth', users);
  app.use('/api/v1/trips', trips);
  app.use('/api/v1/bookings', bookings);
};
