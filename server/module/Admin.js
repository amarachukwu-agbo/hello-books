// Import necessary modules
import models from '../models';
import Users from '../module/User';

export default class Admin extends Users {
  /* Method adds a book
  * @param bookId is the book's id
  * @param title is the book's title
  * @param author is the book's author
  * @param description is the book's description
  * @param imageURL is the book's image URL
  * @param subject is the book's subject
  * @param quantity is the book's quantity
  * @ return book object
  * @return msg string
  */
  static addBook(req, res) {
    models.Book.find({
      where: {
        title: req.body.title,
      },
    })
      .then((book) => {
        if (book) {
          return res.status(400).json({
            msg: 'Book could not be added',
            error: 'Book title already exists',
          });
        }
        return models.Book
          .create({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            subject: req.body.subject,
            imageURL: req.body.imageURL,
            quantity: req.body.quantity,
          })
          .then((bookEntry) => {
            res.status(201).json({ msg: 'Successfully added book', bookEntry });
          })
          .catch((error) => {
            res.status(400).json({ msg: 'Book could not be added', error });
          });
      })
      .catch(error => res.status(400).json({ msg: 'Book could not be added', error }));
  }

  /* Method modifies a book
  * @param res is the response object
  * @param req is the request object
  * @return updatedBook object
  */
  static updateBook(req, res) {
    const bookId = parseInt(req.params.bookId, 10);
    return models.Book.findById(bookId)
      .then((book) => {
        // Check if book exists
        if (!book) return res.status(404).json({ msg: 'Book not found' });
        // Update book
        return book.update({
          id: bookId,
          title: req.body.title || book.title,
          author: req.body.author || book.author,
          description: req.body.description || book.description,
          subject: req.body.subject || book.subject,
          imageURL: req.body.imageURL || book.imageURL,
          quantity: req.body.quantity || book.quantity,
        })
          .then(updatedBook => res.status(201).json({
            msg: 'Successfully updated book', updatedBook,
          }))
          .catch(error => res.status(500).json({
            msg: 'Book not updated', error,
          }));
      })
      .catch(error => res.status(500).json({ msg: 'Book not updated', error }));
  }

  /* Method accepts or declines a borrow request
  @param bookId is the book's id
  @param action takes in 'Accept' or 'Decline'
  */
  static handleBorrowRequest(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const bookId = parseInt(req.params.bookId, 10);
    return models.BorrowRequests.find({
      where: {
        userId,
        bookId,
      },
    })
      .then((request) => {
        if (!request) return res.status(404).json({ msg: 'Borrow request not found' });
        if (request.status === 'Pending') {
          return request.update({
            status: req.body.status,
          })
            .then((borrowRequest) => {
              // Add books to BorrowedBooksTable
              if (req.body.status === 'Accepted') {
                // Add books to BorrowedBooksTable
                models.BorrowedBooks.create({
                  userId,
                  bookId,
                });
                // Increment borrow count and decrement quantity
                models.Book.findById(bookId)
                  .then((book) => {
                    book.increment('borrowCount');
                    book.decrement('quantity');
                  })
                  .catch(error => res.status(400).json({ msg: 'Error handling request', error }));
                return res.status(201).json({ msg: 'Accepted request, book borrowed', borrowRequest });
              }
              return res.status(201).json({ msg: 'Declined request', borrowRequest });
            })
            .catch(error => res.status(400).json({ msg: 'Error handling request', error }));
        }
        return res.status(403).json({ msg: 'Request has already been handled' });
      });
  }

  /* Method accepts or declines a return request
  @param bookId is the book's id
  @param action takes in 'Accept' or 'Decline'
  */
  static handleReturnRequest(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const bookId = parseInt(req.params.bookId, 10);
    return models.ReturnRequests.find({
      where: {
        userId,
        bookId,
      },
    })
      .then((request) => {
        // Check if request exists
        if (!request) return res.status(404).json({ msg: 'Request not found' });
        // Check if request has already been handled
        if (request.status !== 'Pending') return res.status(403).json({ msg: 'Already handled request' });
        // Update request status
        request.update({ status: req.body.status });
        // Accepted request
        if (req.body.status === 'Accepted') {
          // Increment book quantity
          models.Book.findById(req.params.bookId)
            .then(book => book.increment('quantity'));
          return models.BorrowedBooks.find({
            where: {
              bookId,
              userId,
              status: 'Not returned',
            },
          })
            .then((borrowed) => {
              // Change borrowed book status to returned
              borrowed.update({ status: 'Returned' })
                .then(updated => updated.reload())
                .then(returnRequest => res.status(201).json({ msg: 'Request Accepted', returnRequest }))
                .catch(err => res.status(500).json({ msg: 'err', err }));
            })
            .catch(error => res.status(500).json({ msg: 'Error', error }));
        }
        return res.status(201).json({
          msg: 'Request Declined',
          requestId: request.id,
          book: bookId,
          user: userId,
        });
      }).catch(err => res.status(500).json(err));
  }
}
