// Validation middleware for login route
import Joi from 'joi';

const loginSchema = {
  email: Joi.string().email().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
};

const validateLogin = (req, res, next) => {
  const result = Joi.validate(req.body, loginSchema, { allowUnknown: false, abortEarly: false });
  if (result.error) {
    return res.status(400).json({ msg: 'Login unsuccessful', error: result.error.toString() });
  }
  next();
};

export default validateLogin;
