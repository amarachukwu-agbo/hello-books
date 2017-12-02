import Joi from 'joi';

const paramsSchema = {
  params: {
    bookId: Joi.number().integer().positive().required(),
    userId: Joi.number().integer().positive().required(),
  },
};

const validateParamsSchema = (req, res, next) => {
  const result = Joi.validate(
    { params: req.params }, paramsSchema,
    { allowUnknown: false, abortEarly: false },
  );
  if (result.error) {
    return res.status(400).json({
      msg: 'Params must be positive',
      error: result.error.toString(),
    });
  }
  next();
};

export default validateParamsSchema;
