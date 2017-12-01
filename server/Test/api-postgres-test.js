import { expect } from 'chai';
import supertest from 'supertest';
import app from '../index';

const request = supertest;

describe('API Endpoints Test', () => {
  const user = {
    firstName: 'Ama',
    lastName: 'Agbo',
    email: 'goody@gmail.com',
    password: 'hhhhhh',
    role: 'Admin',
  };
  const user2 = {
    firstName: 'Ama',
    lastName: 'Agbo',
    email: 'goody@gmail.com',
  };

  describe('Register a user', () => {
    it('should return success message and a token', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.have.property('msg');
          expect(res.body).to.have.property('token');
          expect(res.body.msg).to.deep.equal('Signup successful');
          expect(res.body.token).to.not.equal(null);
          expect(res.body.token).to.be.a('string');
          done();
        });
    });
    it('should return error message and no token if some fields are missing', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(user2)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Some field missing');
          done();
        });
    });
  });
});
