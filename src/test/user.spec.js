/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import chai, { should } from 'chai';
import chaiHttp from 'chai-http';
import User from '../controllers/user';

chai.use(chaiHttp);
should();

describe('Testing Users', () => {
  it('User Controller should exist', () => {
    User.should.exist;
  });
});
