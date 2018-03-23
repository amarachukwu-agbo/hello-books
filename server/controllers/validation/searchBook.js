// Validation middleware for searchBook route
import Joi from 'joi';

const searchBookSchema = {
  body: {
    title: Joi.string(),
    author: Joi.string(),
    subject: Joi.string(),
  },
};

const validateSearchBookSchema = (req, res, next) => {
  const result = Joi.validate(
    { body: req.body }, searchBookSchema,
    { allowUnknown: false, abortEarly: false },
  );
  if (result.error) {
    return res.status(400).json({
      msg: 'Cannot search for books',
      error: result.error.toString(),
    });
  }
  next();
};

export default validateSearchBookSchema;
