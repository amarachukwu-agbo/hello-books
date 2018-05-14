// Import necessary modules
import models from '../models';
import Helper from '../helpers';

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
    // Check whether book with same title exists
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
              msg: 'Successfully added book',
              bookEntry,
            });
          })
          .catch(error => res.status(400).json({
            msg: 'Book could not be added',
            error,
          }));
      })
      .catch(error => res.status(400).json({
        msg: 'Book could not be added',
        error,
      }));
  }

  /** Delete a book
  * @param {object}req - The request object
  * @param {object} res -The response object
  * @return {object}
  */
  static deleteBook(req, res) {
    const bookId = parseInt(req.params.bookId, 10);
    // Check if bookId is valid
    if (typeof (bookId) === 'number' && bookId > 0) {
      models.Book.destroy({
        where: {
          id: bookId,
        },
      }).then((bookDeleted) => {
        if (bookDeleted !== 0) {
          return res.status(201).json({
            msg: 'Book deleted',
          });
        }
        return res.status(404).json({
          msg: 'Book not found',
        });
      }).catch(error =>
        res.status(500).json({
          msg: 'Book could not be deleted',
          error,
        }));
    } else {
      return res.status(400).json({
        msg: 'bookId must be a positive integer',
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

    // Check if request object is empty
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ msg: 'Nothing to update' });
    }

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
            msg: 'Successfully updated book',
            updatedBook,
          }))
          .catch(error => res.status(500).json({
            msg: 'Book not updated',
            error,
          }));
      })
      .catch(error => res.status(500).json({
        msg: 'Book not updated',
        error,
      }));
  }


  /** Upvote a book
  * @param {object}req - The request object
  * @param {object} res -The response object
  * @return {object}
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
            if (created === true) {
              // Check if user has downvoted book before and delete entry if true
              return models.Downvotes.destroy({
                where: {
                  bookId: req.params.bookId,
                  userId: req.params.userId,
                },
              })
                .then((rowDeleted) => {
                  // Decrement book downvotes if user has downvoted book before
                  if (rowDeleted !== 0) book.decrement('downvotes');
                  // Increment book upvotes and return book
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


  /** Method downvote a book
  * @param {object}req - The request object
  * @param {object} res -The response object
  * @return {object}
  */
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
            // Check if user has upvoted book before and delete entry if true
            if (created === true) {
              return models.Upvotes.destroy({
                where: {
                  bookId: req.params.bookId,
                  userId: req.params.userId,
                },
              })
                .then((rowDeleted) => {
                  // Decrement book upvotes if user has upvoted book before
                  if (rowDeleted !== 0) book.decrement('upvotes');
                  // Increment book downvotes and return book
                  book.increment('downvotes')
                    .then(downVote => downVote.reload())
                    .then(downvoteEntry => res.status(201).json({
                      msg: 'Successfully downvoted book',
                      downvote: {
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

  /** Make a book a favorite
  * @param {object}req - The request object
  * @param {object} res -The response object
  * @return {object}
  */
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
                    book: favorites,
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
      .catch(error => res.status(500).json({
        msg: 'Error favoriting book', error,
      }));
  }

  /** Review a book
  * @param {object}req - The request object
  * @param {object} res -The response object
  * @return {object}
  */
  static reviewBook(req, res) {
    const bookId = parseInt(req.params.bookId, 10);
    const userId = parseInt(req.params.userId, 10);

    models.Book.find({
      where: {
        id: parseInt(req.params.bookId, 10),
      },
      // Join book reviews
      include: [
        {
          model: models.Review,
          as: 'bookReviews',
          include: [
            {
              model: models.User,
              as: 'userReviews',
              attributes: {
                exclude: ['password'],
              },
            }],
        },
      ],
    })
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
              return book.reload()
                .then(reviewedBook =>
                  res.status(201).json({ msg: `Successfully reviewed book ${bookId}`, reviewedBook }));
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

  /**
   * Return all books using a query if specified
   * @static
   * @param {object} req The request object
   * @param {object} res The response object
   * @returns {object}
   */
  static getAllBooks(req, res) {
    const order = req.query.order || 'desc';
    const { sort } = req.query;
    const { page, offset, limit } = Helper.setupPagination(req);

    if (sort && sort.includes('votes')) {
      // Create query parameter for sorting
      const query = {
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

      return models.Book.findAndCountAll(query)
        .then((books) => {
          const pagination = Helper.pagination(page, offset, limit, books);
          if (!books.rows.length) {
            return res.status(404).json({
              msg: 'No book found',
            });
          }
          return res.status(200).json({
            msg: 'Successfully got all books',
            books: books.rows,
            pagination,
          });
        })
        .catch(error => res.status(400).json(error.toString()));
    }

    const query = {
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

    return models.Book.findAndCountAll(query)
      .then((data) => {
        const pagination = Helper.pagination(page, offset, limit, data);
        if (!data.rows.length) {
          return res.status(404).json({
            msg: 'No book found',
          });
        }
        return res.status(200).json({
          msg: 'Successfully got all books',
          books: data.rows,
          pagination,
        });
      })
      .catch(err => res.status(400).json(err.toString()));
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
      // Join book reviews
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
    })
      .then((book) => {
        if (!book) return res.status(404).json({ msg: 'Book not found' });
        return res.status(200).json({ msg: 'Successfully got book', book });
      })
      .catch(err => res.status(400).json(err));
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
    let query;

    if (title) {
      query = {
        where: {
          title: {
            [Sequelize.Op.iLike]: title,
          },
        },
      };
    } else if (author) {
      query = {
        where: {
          author: {
            [Sequelize.Op.iLike]: author,
          },
        },
      };
    } else if (subject) {
      query = {
        where: {
          subject: {
            [Sequelize.Op.iLike]: subject,
          },
        },
      };
    } else {
      return res.status(400).json({
        msg: 'Input a valid search parameter',
      });
    }

    models.Book.findAndCountAll(query)
      .then((books) => {
        const pagination = Helper.pagination(page, offset, limit, books);
        if (!books.rows.length) {
          return res.status(404).json({
            msg: 'No book found',
          });
        }
        return res.status(200).json({
          msg: 'Successfully got all books',
          books: books.rows,
          pagination,
        });
      })
      .catch((error) => {
        res.status(500).json({
          msg: 'Unable to search for books',
          error: error.toString(),
        });
      });
  }
}
