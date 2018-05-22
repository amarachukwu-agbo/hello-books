/**
 * A module to create token for user
 * @module createToken
 */
import jsonwebtoken from 'jsonwebtoken';

const jwt = jsonwebtoken;

/**
 * @param { object } user The user's information
 * @return { string } token The user's token
 */
const createToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 86400,
    },
  );
  return token;
};

export default createToken;
