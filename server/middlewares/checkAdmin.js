import models from '../models';

/**
 * A module that checks if user is an Admin
 * @module checkAdmin
 */

/**
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {Function} next The next function to be executed
 * @return {void}
 */

const checkAdmin = (req, res, next) => {
  const userId = req.decoded.id;
  models.User.findById(userId)
    .then((user) => {
      if (user.role !== 'Admin') {
        return res.status(401).json({
          msg: 'You must be an admin to access this feature',
        });
      }
      next();
    })
    .catch(error => res.status(500).json({
      message: 'Unsucessful',
      error: error.toString(),
    }));
};

export default checkAdmin;
