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

  describe('Register a user', () => {
    it('should return a token', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          //expect(res.body).to.be.a('json');
          //expect(res.body.length).to.equal(2);
          //expect(res.body[0]).to.equal('Signup successful');
          //expect(res.body[1]).to.be('string');
          done();
        });
    });
  });
});
