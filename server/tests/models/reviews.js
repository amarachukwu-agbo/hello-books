import { expect } from 'chai';
import models from '../../models';

describe('MODEL TEST', () => {
  describe('REVIEW', () => {
    it('should create a review successfully', (done) => {
      models.Review.create({
        review: 'I enjoyed this book',
        bookId: 96,
        userId: 1,
      }).then((newReview) => {
        expect(newReview).to.have.property('review');
        expect(newReview).to.have.property('bookId');
        expect(newReview).to.have.property('userId');
        expect(newReview).to.have.property('id');
        expect(newReview.bookId).to.equal(96);
        expect(newReview.userId).to.equal(1);
        expect(newReview.id).to.equal(2);
        expect(newReview.review).to
          .equal('I enjoyed this book');
      });
      done();
    });
    it('should throw validation error if review is null', (done) => {
      models.Review.create({
        bookId: 96,
        userId: 1,
      }).then(() => {
        done();
      }).catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.errors[0].message).to
          .equal('Review.review cannot be null');
        done();
      });
    });
  });
});
