import { expect } from 'chai';
import supertest from 'supertest';
import app from '../index';
import testData from './testData';

const request = supertest;

describe('API Endpoints Test', () => {
  const {
    admin,
    user,
    incompleteUser,
    invalidUser,
    unregisteredUser,
    book,
    incompleteBook,
    zeroQuantityBook,
    invalidBook,
  } = testData;

  let adminToken;
  let userToken;

  before((done) => {
    request(app)
      .post('/api/v1/users/signup')
      .send(admin)
      .end((err, res) => {
        adminToken = res.body.token;
        done();
      });
  });

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
          console.log(userToken);
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
          done();
        });
    });
  });

  describe('Admin can add a book', () => {
    it('should return 201 status', (done) => {
      request(app)
        .post('/api/v1/books')
        .set('Authorization', `Token ${adminToken}`)
        .send(book)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Successfully added book');
          expect(res.body).to.have.property('bookEntry');
          expect(res.body.bookEntry).to.have.any.keys('id', 'title', 'author', 'subject', 'quantity', 'description', 'imageURL');
          expect(res.body.bookEntry).to.have.any.keys('upvotes', 'downvote', 'borrowCount', 'favCount');
          done();
        });
    });
    it('should return 403 error if no token is provided', (done) => {
      request(app)
        .post('/api/v1/books')
        .send(book)
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('No token provided');
          expect(res.body).to.not.have.property('bookEntry');
          done();
        });
    });
    it('should return 400 error if some fields are missing', (done) => {
      request(app)
        .post('/api/v1/books')
        .set('Authorization', `Token ${adminToken}`)
        .send(incompleteBook)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Book could not be added');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should return 400 error if imageURL is not valid', (done) => {
      request(app)
        .post('/api/v1/books')
        .send(invalidBook)
        .set('Authorization', `Token ${adminToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Book could not be added');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should return 400 error if book with same title already exists', (done) => {
      request(app)
        .post('/api/v1/books')
        .set('Authorization', `Token ${adminToken}`)
        .send(book)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Book could not be added');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should return 400 error if book quantity is less than 1', (done) => {
      request(app)
        .post('/api/v1/books')
        .set('Authorization', `Token ${adminToken}`)
        .send(zeroQuantityBook)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Book could not be added');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should return 401 error if a user tries to add a book', (done) => {
      request(app)
        .post('/api/v1/books')
        .set('Authorization', `Token ${userToken}`)
        .send(book)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('You are not authorized to add book');
          done();
        });
    });
  });
});
