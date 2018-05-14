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
  if (req.decoded.role !== 'Admin') {
    return res.status(401).json({
      msg: 'You must be an admin to access this feature',
    });
  }
  next();
};

export default checkAdmin;
