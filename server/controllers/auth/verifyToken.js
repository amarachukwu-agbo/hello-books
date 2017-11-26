// Module verifies tokens
import jsonwebtoken from 'jsonwebtoken';

const jwt = jsonwebtoken;
// Set up middleware to verify a token
const verifyToken = (req, res, next) => {
  // Get token from header
  if (!req.headers.authorization || req.headers.authorization === undefined) {
    return res.status(403).send({ msg: 'No token provided' });
  }
  const authorization = req.headers.authorization.split(' ');
  const token = authorization[1];

  // Decode token
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) res.status(500).send({ msg: 'Failed to authenticate token' });
    req.decoded = decoded;
    // console.log(req);
    next();
  });
};

export default verifyToken;
