import { expect } from 'chai';
import models from '../../models';

describe('MODEL TEST', () => {
  describe('VOTE', () => {
    it('should create a vote entry successfully', (done) => {
      models.Votes.create({
        voteType: 'upvote',
        userId: 2,
        bookId: 96,
      }).then((vote) => {
        expect(vote).to.have.property('voteType');
        expect(vote).to.have.property('bookId');
        expect(vote).to.have.property('userId');
        expect(vote.userId).to.equal(2);
        expect(vote.bookId).to.equal(96);
        expect(vote.voteType).to.equal('upvote');
        done();
      });
    });
    it(
      'should throw sequelize databse error for an invalid voteType',
      (done) => {
        models.Votes.create({
          voteType: 'wrongvote',
          userId: 2,
          bookId: 1,
        }).then(() => {
          done();
        }).catch((error) => {
          expect(error.name).to.equal('SequelizeDatabaseError');
          done();
        });
      },
    );
  });
});

