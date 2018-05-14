// Validation middleware for signUp route
import Joi from 'joi';

const userSchema = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/).required(),
};

const validateUser = (req, res, next) => {
  const result = Joi.validate(req.body, userSchema, { allowUnknown: false, abortEarly: false });
  if (result.error) {
    return res.status(400).json({ msg: 'Signup unsuccessful', error: result.error.toString() });
  }
  next();
};

export default validateUser;