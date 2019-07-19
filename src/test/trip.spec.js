/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import chai, { should } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import TripController from '../controllers/trip';

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


      describe('Testing Trips Endpoints', () => {
        it('Trip Controller should exist', () => {
          TripController.should.exist;
        });

        it('Create Trip method (POST) should exist', () => {
          TripController.createTrip.should.exist;
        });

        it('Create Trip method (POST) should create a new trip', (done) => {
          chai.request(server)
            .post('/api/v1/trips')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
              bus_id: 3,
              origin: 'LAGOS',
              destination: 'LONDON',
              fare: 4500,
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

        it('Create Trip method (POST) should return ERROR if busId does not exist', (done) => {
          chai.request(server)
            .post('/api/v1/trips')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
              bus_id: 0,
              origin: 'LAGOS',
              destination: 'LONDON',
              fare: 4500,
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.be.have.property('status');
              res.body.should.be.have.property('error');
              res.body.status.should.equal(400);
              res.body.error.should.be.a('string');
            });
          done();
        });

        it('Create Trip method (POST) should return ERROR if bus is not active', (done) => {
          chai.request(server)
            .post('/api/v1/trips')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
              bus_id: 1,
              origin: 'LAGOS',
              destination: 'LONDON',
              fare: 4500,
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.be.have.property('status');
              res.body.should.be.have.property('error');
              res.body.status.should.equal(400);
              res.body.error.should.be.a('string');
            });
          done();
        });

        it('Get Trips method (GET) should exist', () => {
          TripController.getTrips.should.exist;
        });

        it('Get Trips method (GET) should retrieve all available trips on record', (done) => {
          chai.request(server)
            .get('/api/v1/trips')
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

        it('Cancel Trip method (PATCH) should exist', () => {
          TripController.cancelTrip.should.exist;
        });

        it('Cancel Trip method (PATCH) should cancel a specific trip', (done) => {
          chai.request(server)
            .patch('/api/v1/trips/1')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
              status: 'cancelled',
            })
            .end((err, res) => {
              res.should.have.status(205);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.be.have.property('status');
              res.body.should.be.have.property('message');
              res.body.status.should.equal(205);
              res.body.data.should.be.a('string');
            });
          done();
        });

        it('Cancel Trip method (PATCH) should return an ERROR if trip is not found', (done) => {
          chai.request(server)
            .patch('/api/v1/trips/0')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
              status: 'cancelled',
            })
            .end((err, res) => {
              res.should.have.status(404);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.be.have.property('status');
              res.body.should.be.have.property('error');
              res.body.status.should.equal(404);
              res.body.data.should.be.a('string');
            });
          done();
        });
      }); // End of top level 'describe' function
    });
  done();
}); // End of before hook function
