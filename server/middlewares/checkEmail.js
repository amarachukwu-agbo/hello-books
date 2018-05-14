import models from '../models';

/**
 * A module that checks if email already exists at sign up
 * @module emailCheck
 */

/**
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {Function} next The next function to be executed
 * @return {void}
 */
const emailCheck = (req, res, next) => {
  // Check if email exists in user model
  models.User.find({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (user) {
        return res.status(400).json({
          msg: 'Signup unsuccessful',
          error: 'Email already exists. Input a different email',
        });
      }
      if (!user) next();
    })
    .catch(error => res.status(400).json({ error }));
};

export default emailCheck;
