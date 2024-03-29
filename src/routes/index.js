import users from './user';
import trips from './trip';
import bookings from './booking';
import buses from './bus';


export default (app) => {
  // Declare Routes
  ('/api/v1/auth', users);
  app.use('/api/v1/trips', trips);
  app.use('/api/v1/bookings', bookings);
  app.use('/api/v1/buses', buses);
};
