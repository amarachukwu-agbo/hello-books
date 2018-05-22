// Validation middleware for searchBook route
import Joi from 'joi';

const searchBookSchema = {
  query: {
    title: Joi.string(),
    author: Joi.string(),
    subject: Joi.string(),
  },
};

const validateSearchBookSchema = (req, res, next) => {
  const result = Joi.validate(
    { query: req.query }, searchBookSchema,
    { allowUnknown: false, abortEarly: false },
  );
  if (result.error) {
    return res.status(400).json({
      msg: 'Unsucessful',
      error: result.error.toString(),
    });
  }
  next();
};

export default validateSearchBookSchema;
