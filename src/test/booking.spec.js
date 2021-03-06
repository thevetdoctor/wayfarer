/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import chai, { should } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import BookingController from '../controllers/booking';

chai.use(chaiHttp);
should();


let adminToken;

before((done) => {
  chai.request(server)
    .post('/api/v1/auth/signin')
    .send({
      email: 'oba@gmail.com',
      password: 'obapass',
    })
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.be.have.property('status');
      res.body.should.be.have.property('data');
      res.body.status.should.equal(200);
      res.body.data.should.be.a('object');
      const { token } = res.body.data;
      // console.log(res.body.data);
      adminToken = token;


      describe('Testing Bookings Endpoints', () => {
        it('Booking Controller should exist', () => {
          BookingController.should.exist;
        });

        it('Create Booking method (POST) should exist', () => {
          BookingController.createBooking.should.exist;
        });

        it('Create Booking method (POST) should book a seat on a specific trip', (done) => {
          chai.request(server)
            .post('/api/v1/bookings')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
              trip_id: 4,
            })
            .end((err, res) => {
              res.should.have.status(201);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.be.have.property('status');
              res.body.should.be.have.property('data');
              res.body.status.should.equal(201);
              res.body.data.should.be.a('object');
            });
          done();
        });

        // it('Create Booking method (POST) should return ERROR if user is not registered', (done) => {
        //   chai.request(server)
        //     .post('/api/v1/bookings')
        //     .set('Authorization', `Bearer ${adminToken.concat('j')}`)
        //     .send({
        //       tripId: 4,
        //     })
        //     .end((err, res) => {
        //       res.should.have.status(404);
        //       res.should.be.json;
        //       res.body.should.be.a('object');
        //       res.body.should.be.have.property('status');
        //       res.body.should.be.have.property('error');
        //       res.body.status.should.equal(404);
        //       res.body.error.should.be.a('string');
        //     });
        //   done();
        // });

        it('Create Booking method (POST) should return ERROR if trip is not available', (done) => {
          chai.request(server)
            .post('/api/v1/bookings')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
              trip_id: 0,
            })
            .end((err, res) => {
              res.should.have.status(404);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.be.have.property('status');
              res.body.should.be.have.property('error');
              res.body.status.should.equal(404);
              res.body.error.should.be.a('string');
            });
          done();
        });

        it('Create Booking method (POST) should return ERROR if trip is cancelled', (done) => {
          chai.request(server)
            .post('/api/v1/bookings')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
              trip_id: 1,
            })
            .end((err, res) => {
              res.should.have.status(404);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.be.have.property('status');
              res.body.should.be.have.property('error');
              res.body.status.should.equal(404);
              res.body.error.should.be.a('string');
            });
          done();
        });

        it('Create Booking method (POST) should return ERROR if trip is fully booked', (done) => {
          chai.request(server)
            .post('/api/v1/bookings')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
              trip_id: 5,
            })
            .end((err, res) => {
              res.should.have.status(404);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.be.have.property('status');
              res.body.should.be.have.property('error');
              res.body.status.should.equal(404);
              res.body.error.should.be.a('string');
            });
          done();
        });

        it('Create Booking method (POST) should return ERROR if user is already booked on the trip', (done) => {
          chai.request(server)
            .post('/api/v1/bookings')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
              trip_id: 2,
            })
            .end((err, res) => {
              res.should.have.status(404);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.be.have.property('status');
              res.body.should.be.have.property('error');
              res.body.status.should.equal(404);
              res.body.error.should.be.a('string');
            });
          done();
        });

        it('Get Bookings method (GET) should exist', () => {
          BookingController.getBookings.should.exist;
        });

        it('Get Bookings method (GET) should return a list of bookings', (done) => {
          chai.request(server)
            .get('/api/v1/bookings')
            .set('Authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.be.have.property('status');
              res.body.should.be.have.property('data');
              res.body.status.should.equal(200);
              res.body.data.should.be.a('array');
            });
          done();
        });

        // No test for errors if no booking exist

        it('Delete Booking method (DELETE) should exist', () => {
          BookingController.deleteBooking.should.exist;
        });

        it('Delete Booking method (DELETE) should delete a specific booking', (done) => {
          chai.request(server)
            .delete('/api/v1/bookings/4')
            .set('Authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.be.have.property('status');
              res.body.should.be.have.property('message');
              res.body.status.should.equal(200);
              res.body.error.should.be.a('string');
            });
          done();
        });

        it('Delete Booking method (DELETE) should return an ERROR if booking is not found', (done) => {
          chai.request(server)
            .delete('/api/v1/bookings/0')
            .set('Authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
              res.should.have.status(404);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.be.have.property('status');
              res.body.should.be.have.property('error');
              res.body.status.should.equal(404);
              res.body.error.should.be.a('string');
            });
          done();
        });

        it('Delete Booking method (DELETE) should return an ERROR if booking is found but not deleted', (done) => {
          chai.request(server)
            .delete('/api/v1/bookings/1')
            .set('Authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
              res.should.have.status(404);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.be.have.property('status');
              res.body.should.be.have.property('error');
              res.body.status.should.equal(404);
              res.body.error.should.be.a('string');
            });
          done();
        });
      }); // End of top level 'describe' function
    });
  done();
}); // End of before hook function
