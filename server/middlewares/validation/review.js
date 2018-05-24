// Validation middleware for reviewBook route
import Joi from 'joi';

const reviewSchema = {
  body: {
    review: Joi.string().required(),
  },
  params: {
    bookId: Joi.number().integer().positive().required(),
  },
};

const validateReviewSchema = (req, res, next) => {
  const result = Joi.validate(
    { body: req.body, params: req.params }, reviewSchema,
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

export default validateReviewSchema;
