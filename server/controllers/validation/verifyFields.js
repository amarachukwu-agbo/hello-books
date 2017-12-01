import Joi from 'joi';

const userSchema = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
};

const validateUser = (req, res, next) => {
  const result = Joi.validate(req.body, userSchema, { allowUnknown: false, abortEarly: false });
  if (result.error) {
    res.status(400).json({ msg: 'Signup unsuccessful', error: result.error.toString() });
  }
  next();
};

export default validateUser;
