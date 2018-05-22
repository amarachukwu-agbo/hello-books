import models from '../models';

/**
 * Check if book title already exists
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @param {Function} next The next function to be executed
 * @return {Object}
 */
export const bookTitleCheck = (req, res, next) => {
  models.Book.find({
    where: {
      title: req.body.title,
    },
  })
    .then((book) => {
      if (book) {
        return res.status(409).json({
          message: 'Unsuccessful',
          error: 'A book with this title already exists. Input a different title',
        });
      }
      if (!book) next();
    })
    .catch(error => res.status(500).json({
      message: 'Unsucessful',
      error,
    }));
};

/**
 * Check if book exists
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @param {Function} next The next function to be executed
 * @return {Object}
 */
export const bookCheck = (req, res, next) => {
  const bookId = parseInt(req.params.bookId, 10);
  models.Book.findById(bookId)
    .then((book) => {
      if (!book) {
        return res.status(404).json({
          message: 'Unsuccessful',
          error: 'Book was not found',
        });
      }
      next();
    }).catch(error => res.status(500).json({
      message: 'Unsucessful',
      error,
    }));
};

