const models = require('../models');

module.exports = {
  createUser(req, res) {
    return models.User
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
      })
      .then(result => res.status(201).send(result))
      .catch(error => res.status(400).send(error));
  },
};
