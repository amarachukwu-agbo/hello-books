
/**
 * A module that verifies a user's token
 * @module verifyToken
*/

import jsonwebtoken from 'jsonwebtoken';

const jwt = jsonwebtoken;

/**
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {Function} next The next function to be executed
 * @return {void}
 */
const verifyToken = (req, res, next) => {
  // Get token from header
  if (!req.headers.authorization || req.headers.authorization === undefined) {
    return res.status(401).send({
      message: 'Unsuccessful',
      error: 'No token provided',
    });
  }
  const authorization = req.headers.authorization.split(' ');
  const token = authorization[1];

  // Decode token
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      const errorMessage = error.name === 'TokenExpiredError' ?
        'Session expired. Login to continue' : 'Failed to authenticate token';
      res.status(401).send({
        message: 'Unsuccessful',
        error: errorMessage,
      });
    }
    req.decoded = decoded;
    next();
  });
};

export default verifyToken;
