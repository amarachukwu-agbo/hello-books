// Validation middleware for updateBook route
import Joi from 'joi';

const updateBookSchema = {
  body: {
    title: Joi.string(),
    author: Joi.string(),
    description: Joi.string(),
    quantity: Joi.number().integer().positive(),
    imageURL: Joi.string().uri({ scheme: ['http', 'https'] }),
    subject: Joi.string(),
  },
  params: {
    bookId: Joi.number().integer().positive().required(),
  },
};

const validateUpdateBookSchema = (req, res, next) => {
  const result = Joi.validate(
    { body: req.body, params: req.params }, updateBookSchema,
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

export default validateUpdateBookSchema;
