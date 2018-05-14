/**
 * A module that prevents a user from accessing another user's resources
 * @module emailCheck
*/

/**
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {Function} next The next function to be executed
 * @return {void}
 */

const checkUser = (req, res, next) => {
  if (req.decoded.id !== parseInt(req.params.userId, 10)) {
    return res.status(401).json({
      msg: 'You are not authorized to perform this action',
    });
  }
  next();
};

export default checkUser;

