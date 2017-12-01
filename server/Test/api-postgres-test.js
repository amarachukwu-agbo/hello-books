import { expect } from 'chai';
import supertest from 'supertest';
import app from '../index';
import testData from './testdata';

const request = supertest;

describe('API Endpoints Test', () => {
  const user = testData.user;
  const incompleteUser = testData.incompleteUser;
  const invalidUser = testData.invalidUser;

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
        .send(incompleteUser)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Signup unsuccessful');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should return error message and no token if input contains an invalid data type', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(invalidUser)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Signup unsuccessful');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should return error message if user signs up with an existing email', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('msg');
          expect(res.body).to.have.property('error');
          expect(res.body.msg).to.deep.equal('Signup unsuccessful');
          expect(res.body.error).to.deep.equal('Email already exists. Input a different email');
          done();
        });
    });
  });

  
});
