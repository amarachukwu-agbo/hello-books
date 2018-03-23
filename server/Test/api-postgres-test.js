import { expect } from 'chai';
import supertest from 'supertest';
import app from '../index';
import testData from './testdata';

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

  describe('An authenticated user can review a book', () => {
    it('should return 201 status', (done) => {
      request(app)
        .post('/api/v1/users/2/review/1')
        .set('Authorization', `Token ${userToken}`)
        .send({ review: 'An amazing read. I loved it!!!' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Successfully reviewed book 1');
          expect(res.body).to.have.property('review');
          expect(res.body.review).to.have.any.keys('bookId', 'userId', 'review', 'createdAt');
          done();
        });
    });
    it('should return 403 error if no token is provided', (done) => {
      request(app)
        .post('/api/v1/users/2/review/1')
        .send({ review: 'An amazing read. I loved it!!!' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('No token provided');
          expect(res.body).to.not.have.property('review');
          done();
        });
    });
    it('should return 400 error if bookId or userId are not positive integers', (done) => {
      request(app)
        .post('/api/v1/users/-2/review/-1')
        .send({ review: 'An amazing read. I loved it!!!' })
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Your review could not be completed');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should return 400 error if review is empty', (done) => {
      request(app)
        .post('/api/v1/users/2/review/1')
        .send({ review: '' })
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Your review could not be completed');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should return 403 error if review already exists', (done) => {
      request(app)
        .post('/api/v1/users/2/review/1')
        .set('Authorization', `Token ${userToken}`)
        .send({ review: 'An amazing read. I loved it!!!' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Your review has already been created');
          done();
        });
    });
    it('should return 400 error if review is a number', (done) => {
      request(app)
        .post('/api/v1/users/2/review/1')
        .set('Authorization', `Token ${userToken}`)
        .send({ review: 1 })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Your review could not be completed');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should return 401 error if a user tries to review a book with a token not matched to userId', (done) => {
      request(app)
        .post('/api/v1/users/2/review/1')
        .set('Authorization', `Token ${adminToken}`)
        .send({ review: 'Love this book' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('You are not authorized to review book');
          done();
        });
    });
    it('should return 404 error if a user tries to review a book not in database', (done) => {
      request(app)
        .post('/api/v1/users/2/review/100')
        .set('Authorization', `Token ${userToken}`)
        .send({ review: 'Love this book' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Book not found');
          done();
        });
    });
  });

  describe('An authenticated user can upvote a book', () => {
    it('should return 201 status', (done) => {
      request(app)
        .post('/api/v1/users/2/book/1/upvote')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Successfully upvoted book');
          expect(res.body).to.have.property('upvote');
          expect(res.body.upvote).to.have.any.keys('bookId', 'userId', 'upvotes');
          done();
        });
    });
    it('should return 403 error if no token is provided', (done) => {
      request(app)
        .post('/api/v1/users/2/book/1/upvote')
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('No token provided');
          expect(res.body).to.not.have.property('upvote');
          done();
        });
    });
    it('should return 400 error if bookId or userId are not positive integers', (done) => {
      request(app)
        .post('/api/v1/users/-2/book/-1/upvote')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Params must be positive');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should return 403 error if user has upvoted book before', (done) => {
      request(app)
        .post('/api/v1/users/2/book/1/upvote')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Already upvoted book');
          done();
        });
    });
    it('should return 401 error if a user tries to upvote a book with a token not matched to userId', (done) => {
      request(app)
        .post('/api/v1/users/2/book/1/upvote')
        .set('Authorization', `Token ${adminToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('You are not authorized to upvote book');
          done();
        });
    });
    it('should return 404 error if a user tries to upvote a book not in database', (done) => {
      request(app)
        .post('/api/v1/users/2/book/100/upvote')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Book not found');
          done();
        });
    });
  });

  describe('An authenticated user can downvote a book', () => {
    it('should return 201 status', (done) => {
      request(app)
        .post('/api/v1/users/2/book/1/downvote')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Successfully downvoted book');
          expect(res.body).to.have.property('downvote');
          expect(res.body.downvote).to.have.any.keys('bookId', 'userId', 'downvotes');
          done();
        });
    });
    it('should return 403 error if no token is provided', (done) => {
      request(app)
        .post('/api/v1/users/2/book/1/downvote')
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('No token provided');
          expect(res.body).to.not.have.property('downvote');
          done();
        });
    });
    it('should return 400 error if bookId or userId are not positive integers', (done) => {
      request(app)
        .post('/api/v1/users/-2/book/-1/downvote')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Params must be positive');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should return 403 error if user has downvoted book before', (done) => {
      request(app)
        .post('/api/v1/users/2/book/1/downvote')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Already downvoted book');
          done();
        });
    });
    it('should return 401 error if a user tries to downvote a book with a token not matched to userId', (done) => {
      request(app)
        .post('/api/v1/users/2/book/1/downvote')
        .set('Authorization', `Token ${adminToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('You are not authorized to downvote book');
          done();
        });
    });
    it('should return 404 error if a user tries to downvote a book not in database', (done) => {
      request(app)
        .post('/api/v1/users/2/book/100/downvote')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Book not found');
          done();
        });
    });
  });

  describe('Get all books in database', () => {
    it('should return 201 and all books including their reviews', (done) => {
      request(app)
        .get('/api/v1/books')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Successfully got all books');
          expect(res.body).to.have.property('books');
          expect(res.body.books[0]).to.have.any.keys('bookReviews');
          expect(res.body.books).to.be.an('array');
          expect(res.body.books[0]).to.have.any.keys('bookId', 'userId', 'quantity', 'author', 'description', 'subject');
          expect(res.body.books[0]).to.have.any.keys('createdAt', 'updatedAt', 'upvotes', 'downvotes', 'borrowCount', 'favCount');
          expect(res.body.books[0].bookReviews).to.be.an('array');
          expect(res.body.books[0].bookReviews[0]).to.have.any.keys('bookId', 'userId', 'review', 'createdAt', 'updatedAt');
          done();
        });
    });
  });

  describe('Get a book in database', () => {
    it('should return 201 status and all books including their reviews', (done) => {
      request(app)
        .get('/api/v1/books/1')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Successfully got book');
          expect(res.body).to.have.property('book');
          expect(res.body.book).to.have.any.keys('bookReviews');
          expect(res.body.book).to.be.an('object');
          expect(res.body.book).to.have.any.keys('bookId', 'userId', 'quantity', 'author', 'description', 'subject');
          expect(res.body.book).to.have.any.keys('createdAt', 'updatedAt', 'upvotes', 'downvotes', 'borrowCount', 'favCount');
          expect(res.body.book.bookReviews).to.be.an('array');
          expect(res.body.book.bookReviews[0]).to.have.any.keys('bookId', 'userId', 'review', 'createdAt', 'updatedAt');
          done();
        });
    });
    it('should return 400 status and error if bookId is negative ', (done) => {
      request(app)
        .get('/api/v1/books/-1')
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Params must be positive');
          expect(res.body).to.have.not.have.property('book');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should return 404 status if book is not found ', (done) => {
      request(app)
        .get('/api/v1/books/81')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Book not found');
          expect(res.body).to.have.not.have.property('book');
          done();
        });
    });
  });

  describe('An authenticated user can favorite a book', () => {
    it('should return 201 status and favorite object', (done) => {
      request(app)
        .post('/api/v1/users/2/fav/1')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Favorited book 1');
          expect(res.body).to.have.property('favorite');
          expect(res.body.favorite).to.have.any.keys('id', 'bookId', 'userId');
          expect(res.body.favorite).to.have.any.keys('createdAt', 'updatedAt');
          expect(res.body).to.have.property('book');
          expect(res.body.bookFavoriteCount).to.deep.equal(1);
          done();
        });
    });
    it('should return 400 status and error if bookId is negative ', (done) => {
      request(app)
        .post('/api/v1/users/2/fav/-11')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Params must be positive');
          expect(res.body).to.have.not.have.property('favorite');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should return 404 status if book is not found ', (done) => {
      request(app)
        .post('/api/v1/users/2/fav/81')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Book not found');
          expect(res.body).to.have.not.have.property('favorite');
          done();
        });
    });
    it('should return 403 status if book is already in favorites ', (done) => {
      request(app)
        .post('/api/v1/users/2/fav/1')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Already favorited book');
          expect(res.body).to.have.not.have.property('favorite');
          done();
        });
    });
  });


  describe('An authenticated user can get his favorite books', () => {
    it('should return 200 status and favorites', (done) => {
      request(app)
        .get('/api/v1/users/2/favbooks')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Your favorite books were successfully retrieved');
          expect(res.body).to.have.property('favorites');
          expect(res.body.favorites[0]).to.have.any.keys('id', 'bookId', 'userId');
          expect(res.body.favorites[0]).to.have.any.keys('createdAt', 'updatedAt');
          done();
        });
    });
    it('should return 400 status and error if bookId is negative ', (done) => {
      request(app)
        .post('/api/v1/users/2/fav/-11')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Params must be positive');
          expect(res.body).to.have.not.have.property('favorites');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should return 404 status if book is not found ', (done) => {
      request(app)
        .post('/api/v1/users/2/fav/81')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Book not found');
          expect(res.body).to.have.not.have.property('favorites');
          done();
        });
    });
    it('should return 403 status if book is already in favorites ', (done) => {
      request(app)
        .post('/api/v1/users/2/fav/1')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Already favorited book');
          expect(res.body).to.have.not.have.property('favorites');
          done();
        });
    });
  });

  describe('An authenticated admin can update a book', () => {
    it('should return 201 status and updated book', (done) => {
      request(app)
        .put('/api/v1/books/1')
        .set('Authorization', `Token ${adminToken}`)
        .send({ title: 'Americanah' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Successfully updated book');
          expect(res.body).to.have.property('updatedBook');
          expect(res.body.updatedBook).to.have.any.keys('id', 'bookId', 'userId');
          expect(res.body.updatedBook).to.have.any.keys('createdAt', 'updatedAt');
          done();
        });
    });
    it('should return 400 status and error if bookId is negative ', (done) => {
      request(app)
        .put('/api/v1/books/-1')
        .set('Authorization', `Token ${adminToken}`)
        .send({ title: 'Americanah' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Book not updated');
          expect(res.body).to.have.not.have.property('updatedBook');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should return 404 status if book is not found ', (done) => {
      request(app)
        .put('/api/v1/books/54')
        .set('Authorization', `Token ${adminToken}`)
        .send({ title: 'Americanah' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Book not found');
          expect(res.body).to.have.not.have.property('error');
          done();
        });
    });
    it('should return 400 status if request body is empty ', (done) => {
      request(app)
        .put('/api/v1/books/1')
        .set('Authorization', `Token ${adminToken}`)
        .send({})
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Nothing to update');
          expect(res.body).to.have.not.have.property('updatedBook');
          done();
        });
    });
    it('should return 401 status if user tries to update book ', (done) => {
      request(app)
        .put('/api/v1/books/1')
        .set('Authorization', `Token ${userToken}`)
        .send({ title: 'Americanah' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('You are not authorised to update book');
          expect(res.body).to.have.not.have.property('updatedBook');
          done();
        });
    });
    it('should return 400 status if admin tries to update book with invalid data ', (done) => {
      request(app)
        .put('/api/v1/books/1')
        .set('Authorization', `Token ${adminToken}`)
        .send({ title: 1 })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.deep.equal('Book not updated');
          expect(res.body).to.have.not.have.property('updatedBook');
          done();
        });
    });
  });
});
