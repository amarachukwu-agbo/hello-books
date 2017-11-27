// import necessary modules
import bcryptjs from 'bcryptjs';
import User from '../module/User';
import createToken from './auth/createToken';


module.exports = {
  // Method registers a new user to the database
  createUser(req, res) {
    // Generate an encrypted password using bcryptjs
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(req.body.password, salt);
    // Add new user to database
    new User().signUp(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.role,
      hash,
    )
      .then((user) => {
        // Provides user with token
        const token = createToken(user);
        res.status(201).send({ msg: 'Signup successful', token });
      })
      .catch(error => res.status(400).send(error));
  },

  authenticateUser(req, res) {
    // Validate email and password fields
    if (!req.body.email) return res.status(400).send({ msg: 'Email field required' });
    if (!req.body.password) return res.status(400).send({ msg: 'Password field required' });

    new User().logIn(req.body.email)
      .then((user) => {
        // Checks if user exists
        if (!user) return res.status(404).send({ msg: 'User not found' });
        return user;
      })
      .then((user) => {
        // Checks if user-provided password is valid
        const passwordMatch = bcryptjs.compareSync(req.body.password, user.password);
        if (!passwordMatch) return res.status(401).send({ msg: 'Authentication failed' });
        // Provides authenticated user with token
        const token = createToken(user);
        res.status(201).send({ msg: 'Login successful', token });
      })
      .catch(error => res.status(500).send(error));
  },

  upVote(req, res) {
    if (!req.params.bookId) return res.status(400).send({ msg: 'Book id required' });
    new User().findBook(req.params.bookId)
      .then((book) => {
        if (!book) return { statusCode: 404, msg: 'Book not found' };
        return book;
      })
      .then((book) => {
        book.increment('upvotes');
        return book;
      })
      .then((book) => {
        console.log(book);
        book.reload();
        return book;
      })
      .then(book => res.status(201).send({ msg: `Upvotes increased to ${book.upvotes}` }))
      .catch(error => res.status(500).send(error));
  },
};
