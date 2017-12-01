import Joi from 'joi';

const userSchema = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
};

const validateUser = (req, res, next) => {
  const result = Joi.validate(req.body, userSchema, { allowUnknown: true, abortEarly: false });
  if (result.error) {
    res.status(400).json({ error: result.error.toString()});
  }
  next();
};

export default validateUser;
