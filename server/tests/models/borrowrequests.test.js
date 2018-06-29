import { expect } from 'chai';
import models from '../../models';

describe('MODEL TEST', () => {
  describe('BORROWREQUESTS', () => {
    it('should create a borrow request successfully', (done) => {
      models.BorrowRequests.create({
        userId: 2,
        bookId: 96,
        returnDate: '12/12/2018',
        reason: 'Research',
      }).then((request) => {
        expect(request).to.have.property('userId');
        expect(request).to.have.property('bookId');
        expect(request).to.have.property('id');
        expect(request.bookId).to.equal(96);
        expect(request.userId).to.equal(2);
        expect(request.id).to.equal(3);
        expect(request.status).to.equal('Pending');
        expect(request.reason).to.equal('Research');
        done();
      });
    });
    it('should throw validation error if returnDate is null', (done) => {
      models.BorrowRequests.create({
        userId: 2,
        bookId: 96,
        reason: 'Research',
      }).then(() => {
        done();
      }).catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.errors[0].message).to
          .equal('BorrowRequests.returnDate cannot be null');
        done();
      });
    });
    it('should throw validation error if reason is null', (done) => {
      models.BorrowRequests.create({
        userId: 2,
        bookId: 96,
        returnDate: '12/12/2018',
      }).then(() => {
        done();
      }).catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.errors[0].message).to
          .equal('BorrowRequests.reason cannot be null');
        done();
      });
    });
  });
});
