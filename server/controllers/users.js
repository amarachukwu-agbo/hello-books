import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import User from '../module/User';

const jwt = jsonwebtoken;

module.exports = {
  createUser(req, res) {
    const hash = bcryptjs.hashSync(req.body.password, 8);
    new User().signUp(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.role,
      hash,
    )
      .then((user) => {
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
          expiresIn: 86400,
        });
        res.status(201).send({ msg: 'Sign up successful', token });
      })
      .catch(error => res.status(400).send(error));
  },
};
