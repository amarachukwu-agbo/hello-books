// Validation middleware for getBook route
import Joi from 'joi';

const querySchema = {
  query: {
    sort: Joi.string(),
    order: Joi.string().valid(['desc', 'asc']),
    limit: Joi.number().integer().positive(),
    page: Joi.number().integer().positive(),
  },
};

const validateQuerySchema = (req, res, next) => {
  const result = Joi.validate(
    { query: req.query }, querySchema,
    { allowUnknown: true, abortEarly: false },
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
