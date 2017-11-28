import { expect } from 'chai';
import supertest from 'supertest';
import app from '../index';

const request = supertest;

describe('API Endpoint Tests', () => {
  const book = {
    id: '7',
    title: 'Things fall apart',
    author: 'Chinua Achebe',
    imageURL: 'http://images.com/image.png',
    quantity: 20,
    description: 'A history of the Biafran war',
    subject: 'History',
  };

  describe('Get all books', () => {
    it('should get all books', (done) => {
      request(app)
        .get('/api/books')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.at.least(3);
          expect(res.body[0]).to.be.an('object');
          expect(res.body[1]).to.be.an('object');
          expect(res.body[2]).to.be.an('object');
          expect(res.body[0]).to.have.any.keys('id', 'title', 'author', 'subject', 'quantity', 'description', 'imageURL');
          expect(res.body[1]).to.have.any.keys('id', 'title', 'author', 'subject', 'quantity', 'description', 'imageURL');
          expect(res.body[2]).to.have.any.keys('id', 'title', 'author', 'subject', 'quantity', 'description', 'imageURL');
          done();
        });
    });
  });

  describe('Add a book', () => {
    it('should add a new book', (done) => {
      request(app)
        .post('/api/books')
        .send(book)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object').that.has.all.keys('id', 'title', 'author', 'description', 'imageURL', 'subject', 'quantity');
          expect(res.body).to.deep.equal({
            id: '7',
            title: 'Things fall apart',
            author: 'Chinua Achebe',
            description: 'A history of the Biafran war',
            imageURL: 'http://images.com/image.png',
            subject: 'History',
            quantity: 20,
          });
          done();
        });
    });
    it('should return 400 error and message: `Some fields missing` if required fields are missing', (done) => {
      request(app)
        .post('/api/books')
        .send({
          id: 5,
          title: 'Things Fall Apart',
          author: 'Chinua Achebe',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('string');
          expect(res.body).to.deep.equal('Some fields missing');
          done();
        });
    });
  });

  describe('Update a book', () => {
    it('should modify properties of a book', (done) => {
      request(app)
        .put('/api/books/4')
        .send({
          id: '4',
          title: 'And the shoffar blew',
          author: 'Francine Rivers',
          description: 'A history of the Biafran war',
          imageURL: 'http://images.com/image.png',
          subject: 'Religion',
          quantity: 12,
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('string');
          expect(res.body).to.deep.equal('Successfully Updated book');
          done();
        });
    });
    it('should return 400 error and message: `Some fields missing` if required fields are missing', (done) => {
      request(app)
        .put('/api/books/1')
        .send({
          title: 'Things Fall Apart',
          author: 'Chinua .G. Achebe',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('string');
          expect(res.body).to.deep.equal('Some fields missing');
          done();
        });
    });
    it('should return 404 error and message: `Book not found` if book id is not in database', (done) => {
      request(app)
        .put('/api/books/21')
        .send({
          title: 'And the shoffar blew',
          author: 'Francine Rivers',
          description: 'A history of the Biafran war',
          imageURL: 'http://images.com/image.png',
          subject: 'Religion',
          quantity: 17,
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.a('string');
          expect(res.body).to.deep.equal('Book not found');
          done();
        });
    });
  });

  describe('Favorite a book', () => {
    it('should make a book a favorite', (done) => {
      request(app)
        .post('/api/users/1234/fav/2')
        .send({
          userId: '1234',
          bookId: '2',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.a('string');
          expect(res.body).to.equal('Favorited Book');
          done();
        });
    });
    it('should return 402 error and message: `Unauthenticated user` if user is not in database', (done) => {
      request(app)
        .post('/api/users/2345/fav/2')
        .send({
          userId: '2345',
          bookId: '2',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(402);
          expect(res.body).to.be.a('string');
          expect(res.body).to.equal('Unauthenticated user');
          done();
        });
    });
    it('should return 404 error and message: `Book not found` if book is not in database', (done) => {
      request(app)
        .post('/api/users/1235/fav/99')
        .send({
          userId: '1235',
          bookId: '99',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.a('string');
          expect(res.body).to.equal('Book not found');
          done();
        });
    });
  });

  describe('Upvote a book', () => {
    it('should upvote a book in the database', (done) => {
      request(app)
        .post('/api/users/upvote/books/2')
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.a('string');
          expect(res.body).to.equal('Successfully upvoted book');
          done();
        });
    });
    it('should return 404 error and message: `Book not found` if book is not in database', (done) => {
      request(app)
        .post('/api/users/upvote/books/99')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.a('string');
          expect(res.body).to.equal('Book not found');
          done();
        });
    });
  });

  describe('downvote a book', () => {
    it('should downvote a book in the database', (done) => {
      request(app)
        .post('/api/users/downvote/books/2')
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.a('string');
          expect(res.body).to.equal('Successfully downvoted book');
          done();
        });
    });
    it('should return 404 error and message: `Book not found` if book is not in database', (done) => {
      request(app)
        .post('/api/users/downvote/books/99')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.a('string');
          expect(res.body).to.equal('Book not found');
          done();
        });
    });
  });

  describe('Get favorite books of a user', () => {
    it('should return favorites book of a user', (done) => {
      request(app)
        .get('/api/users/1234/favbooks')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.at.least(1);
          done();
        });
    });
    it('should return 402 error and message: `Unauthenticated user` if user is not in database', (done) => {
      request(app)
        .get('/api/users/2345/favbooks')
        .end((err, res) => {
          expect(res.statusCode).to.equal(402);
          expect(res.body).to.be.a('string');
          expect(res.body).to.equal('Unauthenticated user');
          done();
        });
    });
    it('should return 404 error and message: `Favorites not found` if user has no favorites', (done) => {
      request(app)
        .get('/api/users/1236/favbooks')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.a('string');
          expect(res.body).to.equal('Favorites not found');
          done();
        });
    });
  });

  describe('Review a book', () => {
    it('should return 201 and sucess message when review is saved', (done) => {
      request(app)
        .post('/api/users/1234/review/1')
        .send({
          review: 'An amazing read',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.a('string');
          expect(res.body).to.equal('Successfully reviewed book 1');
          done();
        });
    });
    it('should return 402 error and message: `Unauthenticated user` if user is not in database', (done) => {
      request(app)
        .post('/api/users/2345/review/1')
        .end((err, res) => {
          expect(res.statusCode).to.equal(402);
          expect(res.body).to.be.a('string');
          expect(res.body).to.equal('Unauthenticated user');
          done();
        });
    });
    it('should return 404 error and message: `Book not found` if book is not in database', (done) => {
      request(app)
        .post('/api/users/1236/review/100')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.a('string');
          expect(res.body).to.equal('Book not found');
          done();
        });
    });
    it('should return 400 error and message: `Bad request, empty body` if review field is empty', (done) => {
      request(app)
        .post('/api/users/1234/review/1')
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.a('string');
          expect(res.body).to.equal('Bad request, empty body');
          done();
        });
    });
  });

  describe('Send a borrow request', () => {
    it('should return 201 status and success message', (done) => {
      request(app)
        .post('/api/users/1234/borrow/1')
        .send({
          reason: 'Assignment',
          comments: 'Nil',
          returnDate: '12/11/2017',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.a('string');
          expect(res.body).to.equal('Borrow request sent');
          done();
        });
    });
    it('should return 402 error and message: `Unauthenticated user` if user is not in database', (done) => {
      request(app)
        .post('/api/users/2345/borrow/1')
        .send({
          reason: 'Assignment',
          comments: 'Nil',
          returnDate: '12/11/2017',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(402);
          expect(res.body).to.be.a('string');
          expect(res.body).to.equal('Unauthenticated user');
          done();
        });
    });
    it('should return 404 error and message: `Book not found` if book is not in database', (done) => {
      request(app)
        .post('/api/users/1236/borrow/122')
        .send({
          reason: 'Assignment',
          comments: 'Nil',
          returnDate: '12/11/2017',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.a('string');
          expect(res.body).to.equal('Book not found');
          done();
        });
    });
  });

  describe('Send a return request', () => {
    it('should return 201 status and success message', (done) => {
      request(app)
        .post('/api/users/1234/return/3')
        .send({
          comments: 'Nil',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.a('string');
          expect(res.body).to.equal('Return request sent');
          done();
        });
    });
    it('should return 402 error and message: `Unauthenticated user` if user is not in database', (done) => {
      request(app)
        .post('/api/users/2345/return/1')
        .send({
          comments: 'Nil',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(402);
          expect(res.body).to.be.a('string');
          expect(res.body).to.equal('Unauthenticated user');
          done();
        });
    });
    it('should return 404 error and message: `Book not found` if book is not in database', (done) => {
      request(app)
        .post('/api/users/1236/return/122')
        .send({
          comments: 'Nil',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.a('string');
          expect(res.body).to.equal('Book not found');
          done();
        });
    });
  });


  describe('Handle a return request', () => {
    it('should return 201 status and success message', (done) => {
      request(app)
        .put('/api/users/1234/return/3')
        .send({
          action: 'Accept',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.a('string');
          expect(res.body).to.equal('Successfully returned book 3');
          done();
        });
    });
    it('should return 201 status and a reject message if request is declined', (done) => {
      request(app)
        .put('/api/users/1234/return/3')
        .send({
          action: 'Decline',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.a('string');
          expect(res.body).to.equal('Your request to return book 3 was declined');
          done();
        });
    });
    it('should return 400 status if no action is sent ', (done) => {
      request(app)
        .put('/api/users/1234/return/3')
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.a('string');
          expect(res.body).to.equal('Bad request');
          done();
        });
    });
  });

  describe('Handle a borrow request', () => {
    it('should return 201 status and success message', (done) => {
      request(app)
        .put('/api/users/1234/borrow/3')
        .send({
          action: 'Accept',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.a('string');
          expect(res.body).to.equal('Successfully borrowed book 3');
          done();
        });
    });
    it('should return 201 status and a reject message if request is declined', (done) => {
      request(app)
        .put('/api/users/1234/borrow/3')
        .send({
          action: 'Decline',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.a('string');
          expect(res.body).to.equal('Your request to borrow book 3 was declined');
          done();
        });
    });
    it('should return 400 status if no action is sent ', (done) => {
      request(app)
        .put('/api/users/1234/borrow/3')
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.a('string');
          expect(res.body).to.equal('Bad request');
          done();
        });
    });
  });
});