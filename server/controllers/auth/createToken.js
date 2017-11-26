// Module generates tokens
import jsonwebtoken from 'jsonwebtoken';

const jwt = jsonwebtoken;
const createToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 86400,
    },
  );
  return token;
};

export default createToken;
