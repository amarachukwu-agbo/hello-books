// Validation middleware for login route
import Joi from 'joi';

const loginSchema = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

const validateLogin = (req, res, next) => {
  const result = Joi.validate(req.body, loginSchema, { allowUnknown: false, abortEarly: false });
  if (result.error) {
    return res.status(400).json({
      message: 'Unsuccessful',
      error: result.error.toString(),
    });
  }
  next();
};

export default validateLogin;
