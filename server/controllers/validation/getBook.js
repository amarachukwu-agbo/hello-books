import Joi from 'joi';

const querySchema = {
  query: {
    sort: Joi.string().valid('upvotes'),
    order: Joi.string().valid('desc'),
  },
};

const validateQuerySchema = (req, res, next) => {
  const result = Joi.validate(
    { query: req.query }, querySchema,
    { allowUnknown: false, abortEarly: false },
  );
  if (result.error) {
    return res.status(400).json({
      msg: 'Invalid query',
      error: result.error.toString(),
    });
  }
  next();
};

export default validateQuerySchema;
