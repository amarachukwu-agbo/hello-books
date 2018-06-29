import { expect } from 'chai';
import models from '../../models';

describe('MODEL TEST', () => {
  describe('BOOK', () => [
    it('should create a book with all values present', (done) => {
      models.Book.create({
        title: 'Van Helsing',
        description: 'Horror book ever',
        author: 'Amarachukwu Agbo',
        quantity: 4,
        imageURL: 'https://res.cloudinary.com/amarachukwu/image.jpg',
        subject: 'Horror',
      })
        .then((newBook) => {
          expect(newBook).to.have.property('title');
          expect(newBook).to.have.property('description');
          expect(newBook).to.have.property('author');
          expect(newBook).to.have.property('quantity');
          expect(newBook).to.have.property('title');
          expect(newBook).to.have.property('imageURL');
          expect(newBook).to.have.property('subject');
          expect(newBook.title).to.equal('Van Helsing');
          expect(newBook.quantity).to.equal(4);
          expect(newBook.description).to.equal('Horror book ever');
          expect(newBook.author).to.equal('Amarachukwu Agbo');
          expect(newBook.borrowCount).to.equal(0);
          expect(newBook.favCount).to.equal(0);
          expect(newBook.upvotes).to.equal(0);
          expect(newBook.downvotes).to.equal(0);
          expect(newBook.imageURL).to
            .equal('https://res.cloudinary.com/amarachukwu/image.jpg');
          expect(newBook.subject).to.equal('Horror');
          done();
        });
    }),
    it(
      `should throw unique constraint error when
      creating a book with a title that exists`,
      (done) => {
        models.Book.create({
          title: 'Van Helsing',
          description: 'Horror book ever',
          author: 'Amarachukwu Agbo',
          quantity: 4,
          imageURL: 'https://res.cloudinary.com/amarachukwu/image.jpg',
          subject: 'Horror',
        }).then(() => {
          done();
        }).catch((error) => {
          expect(error.name).to.equal('SequelizeUniqueConstraintError');
          expect(error.errors[0].message).to
            .equal('A book with this title already exists');
          done();
        });
      },
    ),
    it('should throw validation error if imageURL is null', (done) => {
      models.Book.create({
        title: 'Book',
        description: 'Another book',
        author: 'An author',
        quantity: 3,
        subject: 'Romance',
      }).then(() => {
        done();
      }).catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.errors[0].message).to
          .equal('Book.imageURL cannot be null');
        done();
      });
    }),
    it('should throw validation error if author is null', (done) => {
      models.Book.create({
        title: 'Book without an author',
        description: 'Another book',
        quantity: 3,
        subject: 'Romance',
        imageURL: 'https://res.cloudinary.com/amarachukwu/image.jpg',
      }).then(() => {
        done();
      }).catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.errors[0].message).to
          .equal('Book.author cannot be null');
        done();
      });
    }),
    it('should throw validation error if subject is null', (done) => {
      models.Book.create({
        title: 'Book without subject',
        description: 'Another book',
        quantity: 3,
        author: 'An author',
        imageURL: 'https://res.cloudinary.com/amarachukwu/image.jpg',
      }).then(() => {
        done();
      }).catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.errors[0].message).to
          .equal('Book.subject cannot be null');
        done();
      });
    }),
    it('should throw validation error if description is null', (done) => {
      models.Book.create({
        title: 'Book without description',
        author: 'An author',
        quantity: 3,
        subject: 'Romance',
        imageURL: 'https://res.cloudinary.com/amarachukwu/image.jpg',
      }).then(() => {
        done();
      }).catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.errors[0].message).to
          .equal('Book.description cannot be null');
        done();
      });
    }),
    it('should throw validation error if quantity is null', (done) => {
      models.Book.create({
        title: 'Book without description',
        author: 'An author',
        description: 'A book without quantity',
        subject: 'Romance',
        imageURL: 'https://res.cloudinary.com/amarachukwu/image.jpg',
      }).then(() => {
        done();
      }).catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.errors[0].message).to
          .equal('Book.quantity cannot be null');
        done();
      });
    }),
    it(
      'should throw validation error if quantity is not an integer',
      (done) => {
        models.Book.create({
          title: 'Book without description',
          author: 'An author',
          quantity: 'A number',
          description: 'A book',
          subject: 'Romance',
          imageURL: 'https://res.cloudinary.com/amarachukwu/image.jpg',
        }).then(() => {
          done();
        }).catch((error) => {
          expect(error.name).to.equal('SequelizeValidationError');
          expect(error.errors[0].message).to
            .equal('Quantity must be an integer');
          done();
        });
      },
    ),
  ]);
});
