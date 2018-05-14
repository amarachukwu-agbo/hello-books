// Import necessary modules
import bcryptjs from 'bcryptjs';
import models from '../models';
import createToken from '../helpers/auth/createToken';
import Helper from '../helpers';

/**
 * Class representing a user
 */
export default class Users {
  /** Sign up a user
  * @param {object} res -The HTTP response
  * @param {object} req -The HTTP request
  * @return {object}
  */
  static signUp(req, res) {
    // Hash user's password
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(req.body.password, salt);

    // Assign user a role
    const userRole = 'User';

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
        user.password = null;
        res.status(201).json({
          msg: 'Signup successful',
          user,
          token,
        });
      })
      .catch(error => res.status(400).json(error));
  }

  /** Login a user
  * @param {object} res -The HTTP response
  * @param {object} req -The HTTP request
  * @return {object}
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
        user.password = null;
        res.status(201).json({
          msg: 'Login successful',
          user,
          token,
        });
      })
      .catch(error => res.status(500).json(error));
  }

  /** Get a user's favorite books
  * @param {object}req - The request object
  * @param {object} res -The response object
  * @return {object}
  */
  static getFavoriteBooks(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const { page, offset, limit } = Helper.setupPagination(req);

    const query = {
      where: {
        userId,
      },
      include: [{
        model: models.Book,
        as: 'favBook',
      }],
      order: [
        ['createdAt', 'DESC'],
      ],
      limit,
      offset,
    };
    // Find user's favorites
    return models.Favorites.findAndCountAll(query)
      .then((books) => {
        const pagination = Helper.pagination(page, offset, limit, books);
        if (books.rows.length) {
          return res.status(200).json({
            msg: 'Your favorite books were successfully retrieved',
            favorites: books.rows,
            pagination,
          });
        }
        return res.status(404).json({ msg: 'You have no favorites' });
      })
      .catch((error) => {
        res.status(500).send({
          msg: 'Error fetching favorites book',
          error: error.toString(),
        });
      });
  }

  /** Send a borrow request
  * @param {object} res -The HTTP response
  * @param {object} req -The HTTP request
  * @return {object}
  */

  static sendBorrowRequest(req, res) {
    const bookId = parseInt(req.params.bookId, 10);
    const userId = parseInt(req.params.userId, 10);

    return models.BorrowedBooks.find({
      where: {
        bookId,
        userId,
        status: 'Not returned',
      },
    })
      .then((borrow) => {
        if (borrow) return res.status(403).json({ msg: 'You have not returned book' });
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
                    .then(request => res.status(201).json({
                      msg: 'Borrow request sent',
                      request,
                    }))
                    .catch(error => res.status(400).json({
                      msg: 'Failed',
                      error,
                    }));
                }
                return res.status(403).json({ msg: 'Already sent request' });
              })
              .catch(error => res.status(500).json(error));
          })
          .catch(error => res.status(500).json(error));
      });
  }

  /** Send a return request
  * @param {object} res -The HTTP response
  * @param {object} req -The HTTP request
  * @return {object}
  */
  static sendReturnRequest(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const bookId = parseInt(req.params.bookId, 10);

    // Check if user borrowed book
    return models.BorrowedBooks.find({
      where: {
        userId,
        bookId,
        status: 'Not returned',
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
                userId,
                comments: req.body.comments,
                bookId,
              })
                .then((tempRequest) => {
                  tempRequest.reload({
                    include: [{
                      model: models.Book,
                      as: 'returnRequests',
                      attributes: ['title', 'author'],
                    }],
                  }).then(returnRequest => res.status(201).json({
                    msg: 'Success',
                    returnRequest,
                  }));
                })
                .catch(error => res.status(400).send(error));
            }
            return res.status(403).json({
              msg: 'Your request has already been sent',
            });
          })
          .catch(error => res.status(400).json({
            msg: 'Error sending request',
            error,
          }));
      })
      .catch(error => res.status(400).json({
        msg: 'Error sending request',
        error,
      }));
  }

  /** Handle a return request
  * @param {object} res -The HTTP response
  * @param {object} req -The HTTP request
  * @return {object}
  */
  static handleBorrowRequest(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const bookId = parseInt(req.params.bookId, 10);
    return models.BorrowRequests.find({
      where: {
        userId,
        bookId,
        status: 'Pending',
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
                  .catch(error => res.status(400).json({
                    msg: 'Error handling request',
                    error,
                  }));
                return res.status(201).json({
                  msg: 'Accepted request, book borrowed',
                  borrowRequest,
                });
              }
              return res.status(201).json({
                msg: 'Declined request',
                borrowRequest,
              });
            })
            .catch(error => res.status(400).json({
              msg: 'Error handling request',
              error,
            }));
        }
        return res.status(403).json({
          msg: 'Request has already been handled',
        });
      });
  }

  /** Get users' borrow requests
  * @param {object} res -The HTTP response
  * @param {object} req -The HTTP request
  * @return {object}
  */
  static getBorrowRequests(req, res) {
    const { page, offset, limit } = Helper.setupPagination(req);
    const query = {
      include: [
        {
          model: models.User,
          as: 'userBorrowRequests',
          attributes: {
            exclude: ['password'],
          },
        },
        {
          model: models.Book,
          as: 'borrowRequests',
        },
      ],
      order: [
        ['createdAt', 'DESC'],
      ],
      limit,
      offset,
    };
    models.BorrowRequests.findAndCountAll(query)
      .then((requests) => {
        const pagination = Helper.pagination(page, offset, limit, requests);
        if (!requests.rows.length) {
          return res.status(404).json({
            msg: 'No borrow requests',
          });
        }
        return res.status(200).json({
          msg: 'Successfully got borrow requests',
          requests: requests.rows,
          pagination,
        });
      })
      .catch((error) => {
        res.status(500).json({
          msg: 'Unable to get borrow requests',
          error: error.toString(),
        });
      });
  }

  /** Get user's return requests
  * @param {object} res -The HTTP response
  * @param {object} req -The HTTP request
  * @return {object}
  */
  static getReturnRequests(req, res) {
    const { page, offset, limit } = Helper.setupPagination(req);
    const query = {
      include: [
        {
          model: models.User,
          as: 'userReturnRequests',
          attributes: {
            exclude: ['password'],
          },
        },
        {
          model: models.Book,
          as: 'returnRequests',
        },
      ],
      order: [
        ['createdAt', 'DESC'],
      ],
      limit,
      offset,
    };
    models.ReturnRequests.findAndCountAll(query)
      .then((requests) => {
        const pagination = Helper.pagination(page, offset, limit, requests);
        if (!requests.rows.length) {
          return res.status(404).json({
            msg: 'No return requests',
          });
        }
        return res.status(200).json({
          msg: 'Successfully got return requests',
          requests: requests.rows,
          pagination,
        });
      })
      .catch((error) => {
        res.status(500).json({
          msg: 'Unable to get return requests',
          error,
        });
      });
  }

  /** Accept or decline return request
  * @param {object} res -The HTTP response
  * @param {object} req -The HTTP request
  * @return {object}
  */
  static handleReturnRequest(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const bookId = parseInt(req.params.bookId, 10);
    return models.ReturnRequests.find({
      where: {
        userId,
        bookId,
        status: 'Pending',
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
                .then(returnRequest => res.status(201).json({
                  msg: 'Request Accepted',
                  returnRequest,
                }))
                .catch(err => res.status(500).json({
                  msg: 'err',
                  err,
                }));
            })
            .catch(error => res.status(500).json({
              msg: 'Error',
              error,
            }));
        }
        return res.status(201).json({
          msg: 'Request Declined',
          requestId: request.id,
          status: 'Declined',
          book: bookId,
          user: userId,
        });
      }).catch(err => res.status(500).json(err));
  }

  /** Get a user's profile
  * @param {object} res -The HTTP response
  * @param {object} req -The HTTP request
  * @return {object}
  */
  static getUser(req, res) {
    const userId = parseInt(req.params.userId, 10);

    // Check if userId is valid
    if (typeof (userId) === 'number' && userId > 0) {
      // Find user and include their favorites, borrowed books
      // borrow requests and return requests
      return models.User.find({
        where: {
          id: userId,
        },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: models.BorrowedBooks,
            as: 'userBooks',
            include: [{
              model: models.Book,
              as: 'borrowedBooks',
              attributes: ['title', 'author'],
            }],
          },
          {
            model: models.BorrowRequests,
            as: 'userBorrowRequests',
            include: [{
              model: models.Book,
              as: 'borrowRequests',
              attributes: ['title', 'author'],
            }],
          },
          {
            model: models.ReturnRequests,
            as: 'userReturnRequests',
            include: [{
              model: models.Book,
              as: 'returnRequests',
              attributes: ['title', 'author'],
            }],
          },
          {
            model: models.Favorites,
            as: 'userFavorites',
            include: [{
              model: models.Book,
              as: 'favBook',
              attributes: ['title', 'author'],
            }],
          },
        ],
      })
        .then((user) => {
          if (!user) {
            return res.status(404).json({
              msg: 'User not found',
            });
          }
          return res.status(200).json({
            msg: 'Successfully got user',
            user,
          });
        })
        .catch((error) => {
          res.status(500).json({
            msg: 'Could not get user',
            error,
          });
        });
    }
    return res.status(400).json({ msg: 'userId must be a positive integer' });
  }
}
