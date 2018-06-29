import { expect } from 'chai';
import models from '../../models';

describe('MODEL TEST', () => {
  describe('RETURNREQUESTS', () => {
    it('should create a borrow request successfully', (done) => {
      models.ReturnRequests.create({
        userId: 2,
        bookId: 96,
      }).then((request) => {
        expect(request).to.have.property('userId');
        expect(request).to.have.property('bookId');
        expect(request).to.have.property('id');
        expect(request.bookId).to.equal(96);
        expect(request.userId).to.equal(2);
        expect(request.id).to.equal(2);
        expect(request.status).to.equal('Pending');
        done();
      });
    });
  });
});
