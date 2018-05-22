// Validation middleware for borrowBook route
import Joi from 'joi';

const borrowBookSchema = {
  body: {
    reason: Joi.string().valid('Research', 'Assignment', 'Leisure reading').required(),
    comments: Joi.string(),
    returnDate: Joi.date().min('now').required(),
  },
  params: {
    bookId: Joi.number().integer().positive().required(),
    userId: Joi.number().integer().positive().required(),
  },
};

const validateBorrowBookSchema = (req, res, next) => {
  const result = Joi.validate(
    { body: req.body, params: req.params }, borrowBookSchema,
    { allowUnknown: false, abortEarly: false },
  );
  if (result.error) {
    return res.status(400).json({
      message: 'Unsucessful',
      error: result.error.toString(),
    });
  }
  next();
};

export default validateBorrowBookSchema;
