import { expect } from 'chai';
import supertest from 'supertest';
import app from '../server/index';

const request = supertest;

describe('API Endpoint Tests', () => {
  const book = {
    id: '5',
    title: 'There was a country',
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
          expect(res.body[0]).to.be.an('object');
          expect(res.body[1]).to.be.an('object');
          expect(res.body[2]).to.be.an('object');
          expect(res.body[3]).to.deep.equal({
            id: '4',
            title: 'And the Shoffar Blew',
            author: 'Francine Rivers',
            description: 'A pastor tries to find balance in his career and life',
            imageURL: 'http://images/pic.png',
            subject: 'Religion',
            quantity: '20',
            upvotes: 1,
          });
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
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object').that.has.all.keys('id', 'title', 'author', 'description', 'imageURL', 'subject', 'quantity');
          expect(res.body).to.deep.equal({
            id: '5',
            title: 'There was a country',
            author: 'Chinua Achebe',
            description: 'A history of the Biafran war',
            imageURL: 'http://images.com/image.png',
            subject: 'History',
            quantity: 20,
          });
          done();
        });
    });
  });
});
