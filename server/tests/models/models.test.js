import { expect } from 'chai';
import models from '../../models';

describe('MODEL TEST', () => {
  describe('for Books', () => [
    it('should create a book', () => {
      models.Book.create({
        title: 'Van Helsing',
        description: 'Horror book ever',
        author: 'Amarachukwu Agbo',
        quantity: 4,
        imageUrl: 'https://res.cloudinary.com/amarachukwu/image.jpg',
        subject: 'Horror',
      })
        .then((newBook) => {
          expect(newBook).to.have.property('title');
          expect(newBook).to.have.property('description');
          expect(newBook).to.have.property('author');
          expect(newBook).to.have.property('quantity');
          expect(newBook).to.have.property('title');
          expect(newBook).to.have.property('imageUrl');
          expect(newBook).to.have.property('subject');
          expect(newBook.title).to.equal('Van Helsing');
          expect(newBook.quantity).to.equal(4);
          expect(newBook.description).to.equal('Horror book ever');
          expect(newBook.author).to.equal('Amarachukwu Agbo');
          expect(newBook.imageUrl).to.equal('https://res.cloudinary.com/amarachukwu/image.jpg');
          expect(newBook.subject).to.equal('Horror');
        });
    }),
  ]);
});
