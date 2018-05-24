// Validation middleware to check valid params
import Joi from 'joi';

const paramsSchema = {
  params: {
    bookId: Joi.number().integer().positive(),
    userId: Joi.number().integer().positive(),
  },
};

const validateParamsSchema = (req, res, next) => {
  const result = Joi.validate(
    { params: req.params }, paramsSchema,
    { allowUnknown: false, abortEarly: false },
  );
  if (result.error) {
    return res.status(400).json({
      message: 'Unsuccessful',
      error: result.error.toString(),
    });
  }
  next();
};

export default validateParamsSchema;
