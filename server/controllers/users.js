// Import necessary modules
import bcryptjs from 'bcryptjs';
import models from '../models';
import createToken from '../helpers/auth/createToken';
import Helper from '../helpers/Helper';

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
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(req.body.password, salt);
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
        const token = createToken(user);
        res.status(201).json({
          message: 'Successful',
          user: {
            id: user.id,
            firstName: user.firstName,
            role: user.role,
          },
          token,
        });
      })
      .catch(error => res.status(500).json({
        message: 'Unsucessful',
        error,
      }));
  }

  /** Login a user
  * @param {object} res -The HTTP response
  * @param {object} req -The HTTP request
  * @return {object}
  */
  static logIn(req, res) {
    return models.User
      .findOne({
        where:
          { email: req.body.email },
      }).then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'Unsuccessful',
            error: 'User not found',
          });
        }
        // Check if user-provided password is valid
        const passwordMatch = bcryptjs
          .compareSync(req.body.password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({
            message: 'Unsuccessful',
            error: 'Password provided does not match the user',
          });
        }
        const token = createToken(user);
        user.password = null;
        res.status(201).json({
          message: 'Successful',
          user: {
            id: user.id,
            firstName: user.firstName,
            role: user.role,
          },
          token,
        });
      })
      .catch(error => res.status(500).json({
        message: 'Unsucessful',
        error,
      }));
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
      distinct: true,
    };
    return models.Favorites.findAndCountAll(query)
      .then((books) => {
        const pagination = Helper.pagination(page, offset, limit, books);
        return res.status(200).json({
          message: 'Successful',
          favorites: books.rows,
          pagination,
        });
      })
      .catch((error) => {
        res.status(500).send({
          message: 'Unsucesssful',
          error,
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
        if (borrow) {
          return res.status(403).json({
            message: 'Unsucessful',
            error: 'You have not returned this book',
          });
        }
        models.Book.findById(bookId)
          .then((book) => {
            // Check if book is available
            if (book.quantity === 0) {
              return res.status(403).json({
                message: 'Unsuccessful',
                error: 'Book is not available',
              });
            }
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
                    .then(request => res.status(202).json({
                      message: 'Successful',
                      request,
                    }));
                }
                return res.status(409).json({
                  message: 'Unsuccessful',
                  error: 'Your request has already been sent',
                });
              });
          })
          .catch(error => res.status(500).json({
            message: 'Unsuccessful',
            error,
          }));
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
        if (!borrowed) {
          return res.status(403).json({
            message: 'Unsuccessful',
            error: 'You have not borrowed this book',
          });
        }
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
                    message: 'Successful',
                    returnRequest,
                  }));
                });
            }
            return res.status(409).json({
              message: 'Unsuccessful',
              error: 'Your request has already been sent',
            });
          });
      })
      .catch(error => res.status(500).json({
        message: 'Unsuccessful',
        error,
      }));
  }

  /** Handle a borrow request
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
      include: [{
        model: models.User,
        as: 'userBorrowRequests',
        attributes: ['email', 'firstName'],
      },
      {
        model: models.Book,
        as: 'borrowRequests',
        attributes: ['title'],
      }],
    })
      .then((request) => {
        if (!request) {
          return res.status(404).json({
            message: 'Unsuccessful',
            error: 'Borrow request not found',
          });
        }
        return request.update({
          status: req.body.status,
        })
          .then((borrowRequest) => {
            // Add books to BorrowedBooks Table
            if (req.body.status === 'Accepted') {
              models.BorrowedBooks.create({
                userId,
                bookId,
              });
              // Increment borrow count and decrement quantity
              models.Book.findById(bookId)
                .then((book) => {
                  book.increment('borrowCount');
                  book.decrement('quantity');
                });
            }
            Helper.sendEmail({
              email: request.userBorrowRequests.email,
              emailSubject: `Borrow Request ${req.body.status}`,
              content: `<h4 style="color: #3F55BA"> Hi
              <em>${request.userBorrowRequests.firstName},</em></h4>
              <p>After reviewing your request to borrow
              <strong>${request.borrowRequests.title}</strong>,
              the admin has ${req.body.status.toLowerCase()} the request.</p>
              <h4>Thanks for using Hello Books </h4> <p style="color: #3F55BA">
              <i>© copyright Hello books 2018</i></p>`,
            });
            return res.status(200).json({
              message: 'Successful',
              borrowRequest,
            });
          });
      })
      .catch(error => res.status(500).json({
        message: 'Unsucessful',
        error: error.toString(),
      }));
  }

  /** Get user's return or borrow requests
  * @param {object} res -The HTTP response
  * @param {object} req -The HTTP request
  * @return {object}
  */
  static getRequests(req, res) {
    const { page, offset, limit } = Helper.setupPagination(req);
    const requestType = req.url.split('/')[1].split('?')[0];
    const requestModel =
    `${requestType.charAt(0).toUpperCase()}${requestType.slice(1)}`;
    const query = {
      include: [
        {
          model: models.User,
          as: `user${requestModel}`,
          attributes: {
            exclude: ['password'],
          },
        },
        {
          model: models.Book,
          as: `${requestType}`,
        },
      ],
      order: [
        ['createdAt', 'DESC'],
      ],
      limit,
      offset,
      distinct: true,
    };
    models[`${requestModel}`].findAndCountAll(query)
      .then((requests) => {
        const pagination = Helper.pagination(page, offset, limit, requests);
        return res.status(200).json({
          message: 'Successful',
          requests: requests.rows,
          pagination,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Unsuccessful',
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
      include: [{
        model: models.User,
        as: 'userReturnRequests',
        attributes: ['email', 'firstName'],
      },
      {
        model: models.Book,
        as: 'returnRequests',
        attributes: ['title'],
      }],
    })
      .then((request) => {
      // Check if request exists
        if (!request) {
          return res.status(404).json({
            message: 'Unsuccessful',
            error: 'Return request not found',

          });
        }
        // Update request status
        request.update({ status: req.body.status });
        Helper.sendEmail({
          email: request.userReturnRequests.email,
          emailSubject: `Return Request ${req.body.status}`,
          content: `<h4 style="color: #3F55BA"> Hi <em>
          ${request.userReturnRequests.firstName},</em></h4>
          <p>After reviewing your request to return
          <strong>${request.returnRequests.title}</strong>,
          the admin has ${req.body.status.toLowerCase()} the request.</p>
          <h4>Thanks for using Hello Books </h4> <p style="color: #3F55BA">
          <i>© copyright Hello books 2018</i></p>`,
        });
        // Accepted request
        if (req.body.status === 'Accepted') {
        // Increment book quantity
          models.Book.findById(req.params.bookId)
            .then((book) => {
              book.increment('quantity');
            });
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
                .then(returnRequest => res.status(200).json({
                  message: 'Successful',
                  status: 'Accepted',
                  returnRequest,
                }));
            });
        }
        return res.status(200).json({
          message: 'Successful',
          status: 'Declined',
        });
      })
      .catch(error => res.status(500).json({
        message: 'Unsucessful',
        error,
      }));
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
              message: 'Unsucessful',
              error: 'User not found',
            });
          }
          return res.status(200).json({
            message: 'Successful',
            user,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: 'Unsucessful',
            error,
          });
        });
    }
    return res.status(400).json({
      message: 'Unsucessful',
      error: 'userId must be a positive integer',
    });
  }
}
