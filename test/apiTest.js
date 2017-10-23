import { expect } from 'chai';
import supertest from 'supertest';
import app from '../server/index';

const request = supertest;

describe('API Endpoint Tests', () => {
  describe('Get all books', () => {
    it('should get all books', (done) => {
      request(app)
        .get('/api/books')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(4);
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
            upvotes: 1
          });
          done();
        });
    });
  });
});
