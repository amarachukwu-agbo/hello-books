// Import necessary modules
import bcryptjs from 'bcryptjs';
import models from '../models';
import createToken from '../controllers/auth/createToken';

export default class Users {
  /* Method implements user registration
  * @param res is response object
  * @param req is request object
  * @return user object
  */
  static signUp(req, res) {
    // Hash user's password
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(req.body.password, salt);
    let userRole;

    // Assign the first user to sign up Admin role
    models.User.findAll({})
      .then((users) => {
        console.log(users.length);
        if (users.length === 0) {
          userRole = 'Admin';
        } else {
          userRole = 'User';
        }
        return models.User
          .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            role: userRole,
          })
          .then((user) => {
            // Provides user with token
            const token = createToken(user);
            res.status(201).json({ msg: 'Signup successful', token });
          })
          .catch(error => res.status(400).json(error));
      })
      .catch(error => res.status(400).json(error));
    // Add user object to database
  }

  /* Method implements user login
  * @param req is request object
  * @param res is response object
  * @return user object
  * @return msg string
  */
  static logIn(req, res) {
    // Check if user exists in database
    return models.User
      .findOne({
        where:
          { email: req.body.email },
      }).then((user) => {
        if (!user) return res.status(404).json({ msg: 'User not found' });
        // Checks if user-provided password is valid
        const passwordMatch = bcryptjs.compareSync(req.body.password, user.password);
        if (!passwordMatch) return res.status(401).json({ msg: 'Authentication failed' });
        // Provides authenticated user with token
        const token = createToken(user);
        res.status(201).json({ msg: 'Login successful', user, token });
      })
      .catch(error => res.status(500).json(error));
  }

  /* Method votes up a book
  * @param req is the request object
  * @param res is the response object
  * @param upvote object
  */
  static upvoteBook(req, res) {
    // Check if book exists in database
    const bookId = parseInt(req.params.bookId, 10);
    return models.Book.findById(bookId)
      .then((book) => {
        if (!book) return res.status(404).json({ msg: 'Book not found' });
        // Check if user has upvoted book before
        models.Upvotes.findOrCreate({
          where: {
            bookId: req.params.bookId,
            userId: req.params.userId,
          },
        })
          .spread((upvote, created) => {
            // Increment book upvotes if user has not upvoted book
            if (created === true) {
              return models.Downvotes.destroy({
                where: {
                  bookId: req.params.bookId,
                  userId: req.params.userId,
                },
              })
                .then((rowDeleted) => {
                  if (rowDeleted !== 0) book.decrement('downvotes');
                  book.increment('upvotes')
                    .then(upVote => upVote.reload())
                    .then(upvoteEntry => res.status(201).json({
                      msg: 'Successfully upvoted book',
                      upvote: {
                        userId: req.params.userId,
                        bookId: req.params.bookId,
                        book: upvoteEntry,
                      },
                    }))
                    .catch(error => res.status(400).json({
                      msg: 'Error upvoting book',
                      error,
                    }));
                })
                .catch(error => res.status(500).json({
                  msg: 'Error upvoting book',
                  error,
                }));
            }

            return res.status(403).json({ msg: 'Already upvoted book' });
          })
          .catch((error) => {
            res.status(400).json({
              msg: 'Error upvoting book',
              error,
            });
          });
      })
      .catch((error) => {
        res.status(400).json({ msg: 'Error upvoting book', error });
      });
  }


// New Downvote
  static downvoteBook(req, res) {
    // Check if book exists in database
    const bookId = parseInt(req.params.bookId, 10);
    return models.Book.findById(bookId)
      .then((book) => {
        if (!book) return res.status(404).json({ msg: 'Book not found' });
        // Check if user has upvoted book before
        models.Downvotes.findOrCreate({
          where: {
            bookId: req.params.bookId,
            userId: req.params.userId,
          },
        })
          .spread((upvote, created) => {
            // Increment book upvotes if user has not upvoted book
            if (created === true) {
              return models.Upvotes.destroy({
                where: {
                  bookId: req.params.bookId,
                  userId: req.params.userId,
                },
              })
                .then((rowDeleted) => {
                  if (rowDeleted !== 0) book.decrement('upvotes');
                  book.increment('downvotes')
                    .then(downVote => downVote.reload())
                    .then(downvoteEntry => res.status(201).json({
                      msg: 'Successfully downvoted book',
                      upvote: {
                        userId: req.params.userId,
                        bookId: req.params.bookId,
                        book: downvoteEntry,
                      },
                    }))
                    .catch(error => res.status(400).json({
                      msg: 'Error downvoting book',
                      error,
                    }));
                })
                .catch(error => res.status(500).json({
                  msg: 'Error downvoting book',
                  error,
                }));
            }

            return res.status(403).json({ msg: 'Already downvoted book' });
          })
          .catch((error) => {
            res.status(400).json({
              msg: 'Error downvoting book',
              error,
            });
          });
      })
      .catch((error) => {
        res.status(400).json({ msg: 'Error downvoting book', error });
      });
  }


  /* Method votes down a book
  * @param req is the request object
  * @param res is the response object
  * @return is downvote object
  */
  /* static downvoteBook(req, res) {
    // Check if book exists in database
    return models.Book.findById(req.params.bookId)
      .then((book) => {
        if (!book) return res.status(404).json({ msg: 'Book not found' });
        // Check if user has downvoted book before
        models.Downvotes.findOrCreate({
          where: {
            bookId: req.params.bookId,
            userId: req.params.userId,
          },
        }).spread((downvote, created) => {
          // Increment book upvotes if user has not upvoted book
          if (created === true) {
            return book.increment('downvotes')
            // Increment upvotes and return current value
              .then(downVote => downVote.reload())
              .then(downvotedBook => res.status(201).json({
                msg: 'Successfully downvoted book',
                downvote: {
                  userId: req.params.userId,
                  bookId: req.params.bookId,
                  downvotes: downvotedBook.downvotes,
                },
              }))
              .catch(error => res.status(500).json({
                msg: 'Error downvoting book',
                error,
              }));
          }
          return res.status(403).json({ msg: 'Already downvoted book' });
        })
          .catch((error) => {
            res.status(500).json({
              msg: 'Error downvoting book',
              error,
            });
          });
      })
      .catch((error) => {
        res.status(500).json({ msg: 'Error downvoting book', error });
      });
  }*/

  /* Method lets a user favorite a book
  * @param req is the request is the request object
  * @param res is the response object
  * @return favoriteBook object */
  static favoriteBook(req, res) {
    const bookId = parseInt(req.params.bookId, 10);
    const userId = parseInt(req.params.userId, 10);
    models.Book.findById(bookId)
      .then((book) => {
        if (!book) return res.status(404).json({ msg: 'Book not found' });

        // Check if user has already added book to favorites
        return models.Favorites.findOrCreate({
          where: {
            bookId,
            userId,
          },
        })
          .spread((favorite, created) => {
            // If book is not in user's favorites
            if (created === true) {
              // Increase favCount of book
              return book.increment('favCount')
                .then(favBook => favBook.reload())
                .then((favorites) => {
                  // Return json object
                  res.status(201).json({
                    msg: `Favorited book ${req.params.bookId}`,
                    favorite,
                    bookFavoriteCount: favorites.favCount,
                  });
                });
            }
            // If book is in user's favorites
            return res.status(403).json({ msg: 'Already favorited book' });
          })
          .catch(error => res.status(400).json({
            msg: 'Error favoriting book', error,
          }));
      })
      .catch(error => res.status(400).json({
        msg: 'Error favoriting book', error,
      }));
  }

  /* Method gets a user's favorite books
  * @param req is the request is the request object
  * @param res is the response object
  * @return favoriteBook object
  */
  static getFavoriteBooks(req, res) {
    const userId = parseInt(req.params.userId, 10);
    // Find user's favorites
    return models.Favorites.findAll({
      where: {
        userId,
      },
      include: [{
        model: models.Book,
        as: 'favBook',
      }],
    })
      .then((books) => {
        if (books.length > 0) {
          return res.status(200).json({
            msg: 'Your favorite books were successfully retrieved',
            favorites: books,
          });
        }
        return res.status(404).json({ msg: 'You have no favorites' });
      })
      .catch((error) => {
        res.status(400).send({
          msg: 'Error fetching favorites book',
          error,
        });
      });
  }
  /* Method lets a user review a book
  * @param req is the request is the request object
  * @param res is the response object
  * @return review object is */
  static reviewBook(req, res) {
    const bookId = parseInt(req.params.bookId, 10);
    const userId = parseInt(req.params.userId, 10);

    models.Book.findById(req.params.bookId)
      .then((book) => {
        if (!book) return res.status(404).json({ msg: 'Book not found' });

        // Check if review exists
        return models.Review.findOrCreate({
          where: {
            bookId,
            userId,
            review: req.body.review,
          },
        })
          .spread((review, created) => {
            // If not create review
            if (created === true) {
              return res.status(201).json({ msg: `Successfully reviewed book ${bookId}`, review });
            }
            // No review created
            return res.status(403).json({ msg: 'Your review has already been created' });
          })
          .catch(error => res.status(400).send({
            msg: 'Error reviewing book', error,
          }));
      })
      .catch(error => res.status(400).json({
        msg: 'Error reviewing book', error,
      }));
  }

  /* Method lets a user get all books in the database
  * @param req is the request is the request object
  * @param res is the response object
  * @return book object
  */
  static getAllBooks(req, res) {
    if (req.query.sort === 'upvotes' && req.query.order === 'desc') {
      // Find all books and include reviews
      return models.Book.findAll({
        include: [{
          model: models.Review,
          as: 'bookReviews',
        }],
        order: [
          ['upvotes', 'DESC'],
          [{ model: models.Review, as: 'bookReviews' }, 'createdAt', 'ASC'],
        ],
      })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(400).json(error));
    }
    return models.Book.findAll({
      // Join book reviews
      include: [{
        model: models.Review,
        as: 'bookReviews',
      }],
    })
      .then((books) => {
        if (!books) return res.status(404).json({ msg: 'No book found' });
        return res.status(200).json({ msg: 'Successfully got all books', books });
      })
      .catch(err => res.status(400).json(err));
  }

  /* Method lets a user get a book in the database
  * @param req is the request object
  * @param res is the response object
  * @return book object
  */
  static getBook(req, res) {
    return models.Book.find({
      where: {
        id: parseInt(req.params.bookId, 10),
      },
      // Join book reviews
      include: [{
        model: models.Review,
        as: 'bookReviews',
      }],
    })
      .then((book) => {
        if (!book) return res.status(404).json({ msg: 'Book not found' });
        return res.status(200).json({ msg: 'Successfully got book', book });
      })
      .catch(err => res.status(400).json(err));
  }


  /* Method lets a user send  a borrow request for a book
  @param req is the request object
  @param res is the response object
  @return borrow request object
  */
  static sendBorrowRequest(req, res) {
    const bookId = parseInt(req.params.bookId, 10);
    const userId = parseInt(req.params.userId, 10);

    models.BorrowedBooks.find({
      where: {
        bookId,
        userId,
        status: 'Not returned',
      },
    }).then((borrow) => {
      if (borrow) return res.status(403).json({ msg: 'You have not returned book' });
    });

    models.Book.findById(bookId)
      .then((book) => {
        // Check if book is in database
        if (!book) return res.status(404).json({ msg: 'Book not found' });
        // Check if book is available
        if (book.quantity === 0) return res.status(403).json({ msg: 'Book is not available' });
        // Check if user has sent request before
        return models.BorrowRequests.find({
          where: {
            bookId,
            userId,
            status: 'Pending',
          },
        })
          .then((borrowRequest) => {
            if (!borrowRequest) {
              // Send request if it does not exist in database
              return models.BorrowRequests.create({
                bookId,
                userId,
                reason: req.body.reason,
                returnDate: req.body.returnDate,
                comments: req.body.comments,
              })
                .then(request => res.status(201).json({ msg: 'Borrow request sent', request }))
                .catch(error => res.status(400).json({ msg: 'Failed', error }));
            }
            return res.status(403).json({ msg: 'Already sent request' });
          })
          .catch(error => res.status(500).json(error));
      }).catch(error => res.status(500).json(error));
  }

  /* Method lets a user send  a return request for a book
  @param req is request object
  @param res is response object
  @return return request object
  */
  static sendReturnRequest(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const bookId = parseInt(req.params.bookId, 10);

    // Check if user borrowed book
    return models.BorrowedBooks.find({
      where: {
        userId,
        bookId,
      },
    })
      .then((borrowed) => {
        if (!borrowed) return res.status(404).json({ msg: 'Book not borrowed' });
        // Check if request has already been sent
        models.ReturnRequests.find({
          where: {
            userId,
            bookId,
            status: 'Pending',
          },
        })
          .then((request) => {
            // Send request if it does not exist
            if (!request) {
              return models.ReturnRequests.create({
                bookId,
                userId,
                comments: req.body.comments,
              })
                .then(returnRequest => res.status(201).json({ msg: 'Success', returnRequest }))
                .catch(error => res.status(400).send(error));
            }
            return res.status(403).json({ msg: 'Your request has already been sent' });
          })
          .catch(error => res.status(400).json({ msg: 'Error sending request', error }));
      })
      .catch(error => res.status(400).json({ msg: 'Error sending request', error }));
  }
}
