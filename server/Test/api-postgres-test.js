import { expect } from 'chai';
import supertest from 'supertest';
import app from '../index';
import testData from './testdata';

const request = supertest;

describe('API Endpoints Test', () => {
<<<<<<< HEAD
  const {
    user,
    incompleteUser,
    invalidUser,
    unregisteredUser,
  } = testData;
  let userToken;
=======
  const user = testData.user;
  const incompleteUser = testData.incompleteUser;
  const invalidUser = testData.invalidUser;
>>>>>>> c06628f28b5b457cfafa7f89cb5c249599365928

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
<<<<<<< HEAD
          done();
        });
    });
  });

  describe('Log in a user', () => {
    it('should return 201 status and a token', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send({
          email: user.email,
          password: user.password,
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.have.property('msg');
          expect(res.body).to.have.property('token');
          expect(res.body.msg).to.deep.equal('Login successful');
          expect(res.body.token).to.not.equal(null);
          expect(res.body.token).to.be.a('string');
          userToken = res.body.token;
          done();
        });
    });
    it('should return 400 error and no token if some fields are missing', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send({
          email: user.email,
          password: '',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Login unsuccessful');
          expect(res.body).to.have.property('error');
          expect(res.body).to.not.have.property('token');
          done();
        });
    });
    it('should return 404 error if user is not found', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send({
          email: unregisteredUser.email,
          password: unregisteredUser.password,
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('User not found');
          expect(res.body).to.not.have.property('token');
          done();
        });
    });
    it('should return 401 error if user logins with wrong password', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send({
          email: user.email,
          password: 'WrongPassword',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Authentication failed');
          expect(res.body).to.not.have.property('token');
=======
>>>>>>> c06628f28b5b457cfafa7f89cb5c249599365928
          done();
        });
    });
  });

  
});
