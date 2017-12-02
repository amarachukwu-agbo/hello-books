import Joi from 'joi';

const handleRequestSchema = {
  body: {
    status: Joi.string().valid('Declined', 'Accepted').required(),
  },
  params: {
    bookId: Joi.number().integer().positive().required(),
    userId: Joi.number().integer().positive().required(),
  },
};

const validateHandleRequestSchema = (req, res, next) => {
  const result = Joi.validate(
    { body: req.body, params: req.params }, handleRequestSchema,
    { allowUnknown: false, abortEarly: false },
  );
  if (result.error) {
    return res.status(400).json({
      msg: 'Request not sent',
      error: result.error.toString(),
    });
  }
  next();
};

export default validateHandleRequestSchema;
