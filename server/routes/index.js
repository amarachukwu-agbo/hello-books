// const usersController = require('../controllers/users');
import users from '../controllers/users';
import books from '../controllers/books';

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to Hello-books API',
  }));

  app.post('/api/users', users.createUser);
  app.post('/api/books', books.createBook);
};
