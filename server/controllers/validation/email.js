// Validation middleware for unique mail in database
// Import models
import models from '../../models';

const emailCheck = (req, res, next) => {
  // Check if email exists in user model
  models.User.find({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (user) {
        return res.status(400).json({
          msg: 'Signup unsuccessful',
          error: 'Email already exists. Input a different email',
        });
      }
      if (!user) next();
    })
    .catch(error => res.status(400).json({ error }));
};

export default emailCheck;
