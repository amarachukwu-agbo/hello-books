import { expect } from 'chai';
import dotenv from 'dotenv';
import supertest from 'supertest';
import app from '../../index';
import testData from '../../testdata';

const request = supertest;
let adminToken;
let userToken;

dotenv.config();


describe('Books Controller', () => {
  before((done) => {
    request(app)
      .post('/api/v1/users/signup')
      .send(testData.user)
      .end((err, res) => {
        userToken = res.body.token;
        done();
      });
  });

  describe('POST /api/v1/books', () => {
    before((done) => {
      request(app)
        .post('/api/v1/users/login')
        .send({
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
        })
        .end((err, res) => {
          adminToken = res.body.token;
          done();
        });
    });
    it('should allow only an authenticated admin to add a book', (done) => {
      request(app)
        .post('/api/v1/books')
        .set('Authorization', `Token ${adminToken}`)
        .send(testData.book)
        .end((err, res) => {
          expect(res.body.message).to.deep.equal('Successful');
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('bookEntry');
          expect(res.body.bookEntry).to.have.any.keys('id', 'title', 'author', 'subject', 'quantity', 'description', 'imageURL');
          expect(res.body.bookEntry).to.have.any.keys('upvotes', 'downvote', 'borrowCount', 'favCount');
          done();
        });
    });
    it('should throw 403 error if an authenticated user tries to add a book', (done) => {
      request(app)
        .post('/api/v1/books')
        .set('Authorization', `Token ${userToken}`)
        .send(testData.book)
        .end((err, res) => {
          expect(res.body.message).to.deep.equal('Unsuccessful');
          expect(res.status).to.equal(403);
          expect(res.body.error).to.deep.equal('You must be an admin to access this feature');
          done();
        });
    });
    it('should throw 400 error if an authenticated admin to add a book if some fields are missing', (done) => {
      request(app)
        .post('/api/v1/books')
        .set('Authorization', `Token ${adminToken}`)
        .send(testData.incompleteBook)
        .end((err, res) => {
          expect(res.body.message).to.deep.equal('Unsuccessful');
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should throw 409 error if an authenticated admin to add a book if book title already exists', (done) => {
      request(app)
        .post('/api/v1/books')
        .set('Authorization', `Token ${adminToken}`)
        .send(testData.book)
        .end((err, res) => {
          expect(res.body.message).to.deep.equal('Unsuccessful');
          expect(res.status).to.equal(409);
          expect(res.body.error).to.deep.equal('A book with this title already exists. Input a different title');
          done();
        });
    });
    it('should throw 400 error if imageURL is not valid', (done) => {
      request(app)
        .post('/api/v1/books')
        .send(testData.invalidBook)
        .set('Authorization', `Token ${adminToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.deep.equal('Unsuccessful');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should not allow a book to be added if no token is provided', (done) => {
      request(app)
        .post('/api/v1/books')
        .send(testData.book)
        .end((err, res) => {
          expect(res.body.message).to.deep.equal('Unsuccessful');
          expect(res.status).to.equal(403);
          expect(res.body.error).to.deep.equal('No token provided');
          done();
        });
    });
  });

  describe('PUT /api/v1/books/:bookId', () => {
    it('should update a book successfully when an authenticated admin modifies a book', (done) => {
      request(app)
        .put('/api/v1/books/1')
        .set('Authorization', `Token ${adminToken}`)
        .send({ title: 'Americanah' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.deep.equal('Successful');
          expect(res.body).to.have.property('updatedBook');
          expect(res.body.updatedBook).to.have.any.keys('id', 'title', 'author', 'subject', 'quantity', 'description', 'imageURL');
          expect(res.body.updatedBook.title).to.deep.equal('Americanah');
          done();
        });
    });
    it('should throw 400 error if admin tries to update a book with negative bookId', (done) => {
      request(app)
        .put('/api/v1/books/-1')
        .set('Authorization', `Token ${adminToken}`)
        .send({ title: 'Americanah' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.deep.equal('Unsuccessful');
          expect(res.body).to.have.not.have.property('updatedBook');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should throw 404 error if admin tries to modify a book not in the database', (done) => {
      request(app)
        .put('/api/v1/books/54')
        .set('Authorization', `Token ${adminToken}`)
        .send({ title: 'Americanah' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.deep.equal('Unsuccessful');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.deep.equal('Book was not found');
          done();
        });
    });
    it('should throw 400 error if request body is empty ', (done) => {
      request(app)
        .put('/api/v1/books/1')
        .set('Authorization', `Token ${adminToken}`)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.deep.equal('Unsuccessful');
          expect(res.body.error).to.deep.equal('Nothing to update');
          expect(res.body).to.have.not.have.property('updatedBook');
          done();
        });
    });
    it('should throw 403 error if an authenticated user tries to update book ', (done) => {
      request(app)
        .put('/api/v1/books/1')
        .set('Authorization', `Token ${userToken}`)
        .send({ title: 'Americanah' })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.deep.equal('Unsuccessful');
          expect(res.body.error).to.deep.equal('You must be an admin to access this feature');
          expect(res.body).to.have.not.have.property('updatedBook');
          done();
        });
    });
    it('should throw 400 error if admin tries to update book with invalid data type', (done) => {
      request(app)
        .put('/api/v1/books/1')
        .set('Authorization', `Token ${adminToken}`)
        .send({ title: 1 })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.deep.equal('Unsuccessful');
          expect(res.body).to.have.property('error');
          expect(res.body).to.not.have.property('updatedBook');
          done();
        });
    });
  });

  describe('POST  /api/v1/books/:bookId/review', () => {
    it('should let an authenticated user review a book successfully', (done) => {
      request(app)
        .post('/api/v1/books/1/review')
        .set('Authorization', `Token ${userToken}`)
        .send({ review: 'An amazing read. I loved it!!!' })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Successful');
          expect(res.body).to.have.property('reviewedBook');
          expect(res.body.reviewedBook).to.have.property('bookReviews');
          expect(res.body.reviewedBook.bookReviews[0].review).to.equal('An amazing read. I loved it!!!');
          done();
        });
    });
    it('should throw 403 error if no token is provided', (done) => {
      request(app)
        .post('/api/v1/books/1/review')
        .send({ review: 'An amazing read. I loved it!!!' })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Unsuccessful');
          expect(res.body.error).to.equal('No token provided');
          expect(res.body).to.not.have.property('reviewedBook');
          done();
        });
    });
    it('should throw 400 error if bookId is not a positive integer', (done) => {
      request(app)
        .post('/api/v1/books/-1/review')
        .send({ review: 'An amazing read. I loved it!!!' })
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Unsuccessful');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should return 400 error if review is empty', (done) => {
      request(app)
        .post('/api/v1/books/1/review')
        .send({ review: '' })
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Unsuccessful');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should return 403 error if review already exists', (done) => {
      request(app)
        .post('/api/v1/books/1/review')
        .set('Authorization', `Token ${userToken}`)
        .send({ review: 'An amazing read. I loved it!!!' })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Unsuccessful');
          expect(res.body.error).to.equal('Your review has already been created');
          done();
        });
    });
    it('should return 404 error if a user tries to review a book not in database', (done) => {
      request(app)
        .post('/api/v1/books/880/review')
        .set('Authorization', `Token ${userToken}`)
        .send({ review: 'Love this book' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Unsuccessful');
          expect(res.body.error).to.equal('Book was not found');
          done();
        });
    });
  });

  describe('GET /api/v1/books/:bookId', () => {
    it('should successfully return a book including its reviews', (done) => {
      request(app)
        .get('/api/v1/books/1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Successful');
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
    it('should throw 400 error if bookId is negative ', (done) => {
      request(app)
        .get('/api/v1/books/-1')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Unsuccessful');
          expect(res.body).to.have.not.have.property('book');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should throw 400 error if bookId is not an integer', (done) => {
      request(app)
        .get('/api/v1/books/a')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Unsuccessful');
          expect(res.body).to.have.not.have.property('book');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should throw 404 error if book is not found in the database', (done) => {
      request(app)
        .get('/api/v1/books/810')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Unsuccessful');
          expect(res.body.error).to.equal('Book was not found');
          expect(res.body).to.not.have.property('book');
          done();
        });
    });
  });

  describe('POST /api/v1/books/1/favorite', () => {
    it('should throw 403 error for an unauthenticated user', (done) => {
      request(app)
        .post('/api/v1/books/1/favorite')
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Unsuccessful');
          expect(res.body.error).to.equal('No token provided');
          done();
        });
    });
    it('should return 201 status and favorite object for an authenticated user', (done) => {
      request(app)
        .post('/api/v1/books/1/favorite')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.deep.equal('Successful');
          expect(res.body).to.have.property('favorite');
          expect(res.body.favorite).to.have.any.keys('id', 'bookId', 'userId');
          expect(res.body).to.have.property('book');
          expect(res.body.book.favCount).to.equal(1);
          done();
        });
    });
    it('should throw 400 error if bookId is negative ', (done) => {
      request(app)
        .post('/api/v1/books/-1/favorite')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Unsuccessful');
          expect(res.body).to.have.not.have.property('favorite');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should return 404 error if user tries to favorite a book which does not exist', (done) => {
      request(app)
        .post('/api/v1/books/1234/favorite')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Unsuccessful');
          expect(res.body.error).to.equal('Book was not found');
          expect(res.body).to.have.not.have.property('favorite');
          done();
        });
    });
    it('should return 403 error if book is already in user\'s favorites', (done) => {
      request(app)
        .post('/api/v1/books/1/favorite')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Unsuccessful');
          expect(res.body.error).to.equal('Already favorited book');
          expect(res.body).to.have.not.have.property('favorite');
          done();
        });
    });
  });

  describe('POST /api/v1/books/:bookId/downvote', () => {
    it('should throw 403 error if no token is provided', (done) => {
      request(app)
        .post('/api/v1/books/1/downvote')
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.deep.equal('Unsuccessful');
          expect(res.body.error).to.deep.equal('No token provided');
          expect(res.body).to.not.have.property('vote');
          done();
        });
    });
    it('should return 201 status when an authenticated user upvotes a book', (done) => {
      request(app)
        .post('/api/v1/books/1/downvote')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Successful');
          expect(res.body).to.have.property('vote');
          expect(res.body.vote).to.have.any.keys('bookId', 'book');
          expect(res.body.vote.book.downvotes).to.equal(1);
          done();
        });
    });
    it('should throw 400 error if bookId is not a positive integer', (done) => {
      request(app)
        .post('/api/v1/books/-1/downvote')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.deep.equal('Unsuccessful');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should throw 403 error if user has downvoted book before', (done) => {
      request(app)
        .post('/api/v1/books/1/downvote')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.deep.equal('Unsuccessful');
          expect(res.body.error).to.deep.equal('You have already downvoted this book');
          done();
        });
    });
    it('should throw 404 error if a user tries to downvote a book not in database', (done) => {
      request(app)
        .post('/api/v1/books/1000/downvote')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.deep.equal('Unsuccessful');
          expect(res.body.error).to.deep.equal('Book was not found');
          done();
        });
    });
  });

  describe('POST /api/v1/books/:bookId/upvote', () => {
    it('should throw 403 error if no token is provided', (done) => {
      request(app)
        .post('/api/v1/books/1/upvote')
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.deep.equal('Unsuccessful');
          expect(res.body.error).to.deep.equal('No token provided');
          expect(res.body).to.not.have.property('vote');
          done();
        });
    });
    it('should return 201 status when an authenticated user upvotes a book', (done) => {
      request(app)
        .post('/api/v1/books/1/upvote')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Successful');
          expect(res.body).to.have.property('vote');
          expect(res.body.vote).to.have.any.keys('bookId', 'book');
          expect(res.body.vote.book.upvotes).to.equal(1);
          done();
        });
    });
    it('should throw 400 error if bookId is not a positive integer', (done) => {
      request(app)
        .post('/api/v1/books/-1/upvote')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.deep.equal('Unsuccessful');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should throw 403 error if user has upvoted book before', (done) => {
      request(app)
        .post('/api/v1/books/1/upvote')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.deep.equal('Unsuccessful');
          expect(res.body.error).to.deep.equal('You have already upvoted this book');
          done();
        });
    });
    it('should throw 404 error if a user tries to upvote a book not in database', (done) => {
      request(app)
        .post('/api/v1/books/1000/upvote')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Unsuccessful');
          expect(res.body.error).to.equal('Book was not found');
          done();
        });
    });
  });

  describe('POST /api/v1/books/search', () => {
    it('should return books with a particular author when the author query is passed', (done) => {
      request(app)
        .post('/api/v1/books/search?author=Chimamanda Adichie')
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Successful');
          expect(res.body.books[0].author).to.equal('Chimamanda Adichie');
          expect(res.body.pagination.bookCount).to.equal(1);
          done();
        });
    });
    it('should return a book with a particular title when the title query is passed', (done) => {
      request(app)
        .post('/api/v1/books/search?title=Americanah')
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Successful');
          expect(res.body.books[0].title).to.equal('Americanah');
          expect(res.body.pagination.currentPage).to.equal(1);
          expect(res.body.pagination.bookCount).to.equal(1);
          done();
        });
    });
    it('should return books with a particular subject when the subject query is passed', (done) => {
      request(app)
        .post('/api/v1/books/search?subject=Fiction')
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Successful');
          expect(res.body.books[0].subject).to.equal('Fiction');
          expect(res.body.pagination.currentPage).to.equal(1);
          done();
        });
    });
    it('should throw 400 error if an invalid query is passed', (done) => {
      request(app)
        .post('/api/v1/books/search?subjec=Fiction')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Unsuccessful');
          expect(res.body).to.have.property('error');
          expect(res.body).to.not.have.property('books');
          done();
        });
    });
    it('should return 404 status if no book matches the query', (done) => {
      request(app)
        .post('/api/v1/books/search?subject=Adventure')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.not.have.property('books');
          expect(res.body.error).to.equal('No book matches search query');
          done();
        });
    });
  });

  describe('GET /api/v1/books', () => {
    it('should return 200 and all books including their reviews', (done) => {
      request(app)
        .get('/api/v1/books')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.deep.equal('Successful');
          expect(res.body).to.have.property('books');
          expect(res.body.books[0]).to.have.any.keys('bookReviews');
          expect(res.body.books).to.be.an('array');
          done();
        });
    });
    it('should get all books with upvotes sorted in ascending order when the query is passed', (done) => {
      request(app)
        .get('/api/v1/books?sort=upvotes')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.deep.equal('Successful');
          expect(res.body).to.have.property('books');
          expect(res.body.books.length).to.equal(1);
          expect(res.body.pagination.currentPage).to.equal(1);
          done();
        });
    });
    it('should get all books in a page when the page query is passed', (done) => {
      request(app)
        .get('/api/v1/books?page=2')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.deep.equal('Successful');
          expect(res.body).to.have.property('books');
          expect(res.body.pagination.currentPage).to.equal(2);
          done();
        });
    });
    it('should limit the books retrieved to the limit specified in the limit query', (done) => {
      request(app)
        .get('/api/v1/books?page=1&limit=5')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.deep.equal('Successful');
          expect(res.body).to.have.property('books');
          expect(res.body.pagination.currentPage).to.equal(1);
          expect(res.body.books.length).to.equal(5);
          done();
        });
    });
  });

  describe('DELETE /api/v1/books/:bookId', () => {
    it('should throw 403 error if no token is provided', (done) => {
      request(app)
        .delete('/api/v1/books/88')
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Unsuccessful');
          expect(res.body.error).to.equal('No token provided');
          done();
        });
    });
    it('should throw 403 error if an authenticated user tries to delete a book', (done) => {
      request(app)
        .delete('/api/v1/books/88')
        .set('Authorization', `Token ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Unsuccessful');
          expect(res.body.error).to.equal('You must be an admin to access this feature');
          done();
        });
    });
    it('should let an authenticated admin successfully delete a book in the database', (done) => {
      request(app)
        .delete('/api/v1/books/88')
        .set('Authorization', `Token ${adminToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(204);
          done();
        });
    });
    it('should throw 404 error if an authenticated admin tries to delete a book that does not exist', (done) => {
      request(app)
        .delete('/api/v1/books/88')
        .set('Authorization', `Token ${adminToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Unsuccessful');
          expect(res.body.error).to.equal('Book was not found');
          done();
        });
    });
    it('should throw 400 error if an authenticated admin tries to delete a book with a negative bookId', (done) => {
      request(app)
        .delete('/api/v1/books/-1')
        .set('Authorization', `Token ${adminToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Unsuccessful');
          expect(res.body.error).to.equal('bookId must be a positive integer');
          done();
        });
    });
    it('should throw 400 error if an authenticated admin tries to delete a book with bookId that is not an integer', (done) => {
      request(app)
        .delete('/api/v1/books/add')
        .set('Authorization', `Token ${adminToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Unsuccessful');
          expect(res.body.error).to.equal('bookId must be a positive integer');
          done();
        });
    });
  });
});
