// Import necessary modules
import models from '../models';
import Helper from '../helpers/Helper';

const Sequelize = require('sequelize');

/**
 * Class representing a book
 */
export default class Book {
  /** Add a book
  * @param {object} response - The HTTP response
  * @param {object} request - The HTTP request
  * @return {object}
  */
  static addBook(req, res) {
    // If book title does not exist create book
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
        res.status(201).json({
          message: 'Successful',
          bookEntry,
        });
      })
      .catch(error => res.status(500).json({
        message: 'Unsuccessful',
        error: error.toString(),
      }));
  }

  /** Delete a book
  * @param {object}req - The request object
  * @param {object} res -The response object
  * @return {object}
  */
  static deleteBook(req, res) {
    const bookId = parseInt(req.params.bookId, 10);
    if (typeof (bookId) === 'number' && bookId > 0) {
      models.Book.destroy({
        where: {
          id: bookId,
        },
      }).then((bookDeleted) => {
        if (bookDeleted) {
          return res.status(204).json({});
        }
        return res.status(404).json({
          message: 'Unsuccessful',
          error: 'Book was not found',
        });
      }).catch(error =>
        res.status(500).json({
          message: 'Unsuccessful',
          error,
        }));
    } else {
      return res.status(400).json({
        message: 'Unsuccessful',
        error: 'bookId must be a positive integer',
      });
    }
  }

  /** Update a book
  * @param {object}req - The request object
  * @param {object} res -The response object
  * @return {object}
  */
  static updateBook(req, res) {
    const bookId = parseInt(req.params.bookId, 10);
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: 'Unsuccessful',
        error: 'Nothing to update',
      });
    }
    return models.Book.findById(bookId)
      .then(book => book.update({
        id: bookId,
        title: req.body.title || book.title,
        author: req.body.author || book.author,
        description: req.body.description || book.description,
        subject: req.body.subject || book.subject,
        imageURL: req.body.imageURL || book.imageURL,
        quantity: req.body.quantity || book.quantity,
      })
        .then(updatedBook => res.status(200).json({
          message: 'Successful',
          updatedBook,
        })))
      .catch(error => res.status(500).json({
        message: 'Unsuccessful',
        error,
      }));
  }


  /** Upvote or downvote a book
  * @param {object}req - The request object
  * @param {object} res -The response object
  * @return {object}
  */
  static voteBook(req, res) {
    const { bookId } = req.params;
    const userId = req.decoded.id;
    const voteType = req.url.split('/')[2];
    models.Votes.find({
      where: {
        bookId,
        userId,
      },
    }).then((vote) => {
      if (vote && vote.voteType === voteType) {
        return res.status(403).json({
          message: 'Unsuccessful',
          error: `You have already ${voteType}d this book`,
        });
      }
      if (!vote) {
        models.Votes.create({
          userId,
          bookId,
          voteType,
        });
      }
      models.Book.findById(bookId).then((book) => {
        if (vote && vote.voteType !== voteType) {
          const oldVote = vote.voteType;
          vote.update({ voteType });
          book.decrement(`${oldVote}s`);
        }
        book.increment(`${voteType}s`)
          .then(bookVote => bookVote.reload())
          .then(updatedBook => res.status(201).json({
            message: 'Successful',
            vote: {
              userId: req.params.userId,
              bookId: req.params.bookId,
              book: updatedBook,
            },
          })).catch(error => res.status(500).json({
            message: 'Unsucessful',
            error,
          }));
      });
    });
  }

  /** Make a book a favorite
  * @param {object}req - The request object
  * @param {object} res -The response object
  * @return {object}
  */
  static favoriteBook(req, res) {
    const bookId = parseInt(req.params.bookId, 10);
    const userId = req.decoded.id;
    return models.Favorites.findOrCreate({
      where: {
        bookId,
        userId,
      },
    })
      .spread((favorite, created) => {
        if (created === true) {
          return models.Book.findById(bookId)
            .then((book) => {
              book.increment('favCount')
                .then(favBook => favBook.reload())
                .then((favorites) => {
                  res.status(201).json({
                    message: 'Successful',
                    favorite,
                    book: favorites,
                  });
                });
            });
        }
        return res.status(403).json({
          message: 'Unsuccessful',
          error: 'Already favorited book',
        });
      })
      .catch(error => res.status(500).json({
        message: 'Unsuccessful',
        error: error.toString(),
      }));
  }

  /** Review a book
  * @param {object}req - The request object
  * @param {object} res -The response object
  * @return {object}
  */
  static reviewBook(req, res) {
    const bookId = parseInt(req.params.bookId, 10);
    const userId = req.decoded.id;

    models.Book.find({
      where: {
        id: parseInt(req.params.bookId, 10),
      },
      include: [
        {
          model: models.Review,
          as: 'bookReviews',
          include: [
            {
              model: models.User,
              as: 'userReviews',
              attributes: {
                exclude: ['password', 'email', 'role', 'updatedAt'],
              },
            }],
        },
      ],
    })
      .then(book =>
        models.Review.findOrCreate({
          where: {
            bookId,
            userId,
            review: req.body.review,
          },
        })
          .spread((review, created) => {
            if (created === true) {
              return book.reload()
                .then(reviewedBook =>
                  res.status(201).json({
                    message: 'Successful',
                    reviewedBook,
                  }));
            }
            return res.status(403).json({
              message: 'Unsuccessful',
              error: 'Your review has already been created',
            });
          })
          .catch(error => res.status(500).send({
            message: 'Unsucessful',
            error,
          })))
      .catch(error => res.status(500).json({
        message: 'Unsucessful',
        error,
      }));
  }

  /**
   * Return all books using a query if specified
   * @static
   * @param {object} req The request object
   * @param {object} res The response object
   * @returns {object}
   */
  static getAllBooks(req, res) {
    const order = req.query.order || 'desc';
    let query;
    const { sort } = req.query;
    const { page, offset, limit } = Helper.setupPagination(req);

    if (sort && sort.includes('votes')) {
      query = {
        include: [{
          model: models.Review,
          as: 'bookReviews',
        }],
        order: [
          [sort, (order).toUpperCase()],
          [{ model: models.Review, as: 'bookReviews' }, 'createdAt', 'ASC'],
        ],
        limit,
        offset,
      };
      if (sort === 'upvotes') {
        query.where = {
          upvotes: {
            [Sequelize.Op.gte]: 1,
          },
        };
      }
      if (sort === 'downvotes') {
        query.where = {
          downvotes: {
            [Sequelize.Op.gte]: 1,
          },
        };
      }
    } else {
      query = {
        include: [{
          model: models.Review,
          as: 'bookReviews',
        }],
        order: [
          ['createdAt', 'DESC'],
        ],
        limit,
        offset,
      };
    }
    return models.Book.findAndCountAll(query)
      .then((books) => {
        const pagination = Helper.pagination(page, offset, limit, books);
        if (!books.rows.length) {
          return res.status(204);
        }
        return res.status(200).json({
          message: 'Successful',
          books: books.rows,
          pagination,
        });
      })
      .catch(error => res.status(500).json({ message: 'Unsucessful', error }));
  }

  /** Get a book in the database
  * @param {object}req - The request object
  * @param {object} res -The response object
  * @return {object}
  */
  static getBook(req, res) {
    return models.Book.find({
      where: {
        id: parseInt(req.params.bookId, 10),
      },
      include: [
        {
          model: models.Review,
          as: 'bookReviews',
          include: [{
            model: models.User,
            as: 'userReviews',
            attributes: {
              exclude: ['password'],
            },
          }],
        },
      ],
      order: [
        [{ model: models.Review, as: 'bookReviews' }, 'createdAt', 'DESC'],
      ],
    })
      .then(book => res.status(200).json({
        message: 'Successful',
        book,
      }))
      .catch(error => res.status(500).json({
        message: 'Unsuccessful',
        error,
      }));
  }

  /** Method lets a user get a book(s) in the database using search parameters
  * @param req is the request object
  * @param res is the response object
  * @return book object
  */

  static searchBooks(req, res) {
    const {
      title,
      author,
      subject,
    } = req.query;
    const { page, offset, limit } = Helper.setupPagination(req);
    const query = {
      include: [{
        model: models.Review,
        as: 'bookReviews',
      }],
      order: [
        ['createdAt', 'DESC'],
      ],
    };
    if (title) {
      query.where = {
        title: {
          [Sequelize.Op.iLike]: title,
        },
      };
    } else if (author) {
      query.where = {
        author: {
          [Sequelize.Op.iLike]: author,
        },
      };
    } else if (subject) {
      query.where = {
        subject: {
          [Sequelize.Op.iLike]: subject,
        },
      };
    }
    models.Book.findAndCountAll(query)
      .then((books) => {
        const pagination = Helper.pagination(page, offset, limit, books);
        if (!books.rows.length) {
          return res.status(404).json({
            message: 'Successful',
            error: 'No book matches search query',
          });
        }
        return res.status(201).json({
          message: 'Successful',
          books: books.rows,
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
}
