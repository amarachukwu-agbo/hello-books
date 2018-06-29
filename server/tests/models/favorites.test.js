import { expect } from 'chai';
import models from '../../models';

describe('MODEL TEST', () => {
  describe('FAVORITES', () => {
    it('should create a favorite entry successfully', (done) => {
      models.Favorites.create({
        userId: 2,
        bookId: 96,
      }).then((favorite) => {
        expect(favorite).to.have.property('userId');
        expect(favorite).to.have.property('bookId');
        expect(favorite).to.have.property('id');
        expect(favorite.bookId).to.equal(96);
        expect(favorite.userId).to.equal(2);
        expect(favorite.id).to.equal(3);
        done();
      });
    });
  });
});
