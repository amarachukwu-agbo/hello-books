// Validation middleware for returnRequest route
import Joi from 'joi';

const returnRequestSchema = {
  body: {
    comments: Joi.string(),
  },
  params: {
    bookId: Joi.number().integer().positive().required(),
    userId: Joi.number().integer().positive().required(),
  },
};

const validateReturnRequestSchema = (req, res, next) => {
  const result = Joi.validate(
    { body: req.body, params: req.params }, returnRequestSchema,
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

export default validateReturnRequestSchema;
