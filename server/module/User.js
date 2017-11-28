// Import necessary modules
import bcryptjs from 'bcryptjs';
import models from '../models';
import createToken from '../controllers/auth/createToken';

export default class Users {
  /* Method implements user registration
  @params firstName, lastName, email, role and password
  of user a stored in the User's table
  @return user object
  */
  static signUp(req, res) {
    // Hash user's password
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(req.body.password, salt);
    // Add user object to database
    return models.User
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role,
        password: hash,
      }).then((user) => {
        // Provides user with token
        const token = createToken(user);
        res.status(201).json({ msg: 'Signup successful', token });
      })
      .catch(error => res.status(500).json(error));
  }
  /* Method implements user login
  * @params email is used to find a user stored in the User's table
  * @return user object
  * @return msg string
  */
  static logIn(req, res) {
    // Check if user exists in database
    return models.User
      .findOne({
        where:
          { email: req.body.email },
      }).then((user) => {
        if (!user) return res.status(404).json({ msg: 'User not found' });
        // Checks if user-provided password is valid
        const passwordMatch = bcryptjs.compareSync(req.body.password, user.password);
        if (!passwordMatch) return res.status(401).send({ msg: 'Authentication failed' });
        // Provides authenticated user with token
        const token = createToken(user);
        res.status(201).json({ msg: 'Login successful', token });
      })
      .catch(error => res.status(500).json(error));
  }

  /* Method votes up a book
  * @param req is the request object
  * @param res is the response object
  */
  static upvoteBook(req, res) {
    // Check if book exists in database
    models.Book.findById(req.params.bookId)
      .then((book) => {
        if (!book) return res.status(404).json({ msg: 'Book not found' });
        // Check if user has upvoted book before
        models.Upvotes.findOrCreate({
          where: {
            bookId: req.params.bookId,
            userId: req.params.userId,
          },
        }).spread((upvote, created) => {
          console.log(created);
          // Increment book upvotes if user has not upvoted book
          if (created === true) {
            book.increment('upvotes')
              .then(incrementedBook =>
                incrementedBook.reload())
              .then((reloadedBook) => {
                console.log(reloadedBook.upvotes);
                return res.status.json({ msg: `Upvotes increased to ${reloadedBook.upvotes}` });
              });
          // .catch(error => res.status(500).json({ msg: error }));
          }
          return res.status(403).json({ msg: 'Already upvoted book' });
        });
      })
      .catch(error => res.status(500).json({ msg: error }));
  }


  /* Method votes up a book
  * @param req is the request object
  * @param res is the response object
  */
  static downvoteBook(req, res) {
    // Check if book exists in database
    models.Book.findById(req.params.bookId)
      .then((book) => {
        if (!book) return res.status(404).json({ msg: 'Book not found' });
        // Check if user has downvoted book before
        models.Downvotes.findOrCreate({
          where: {
            bookId: req.params.bookId,
            userId: req.params.userId,
          },
        }).spread((downvote, created) => {
          // Increment book downvotes if user has not upvoted book
          if (created === true) {
            book.increment('downvotes')
              .then(incrementedBook => incrementedBook.reload())
              .then((reloadedBook) => {
                console.log(reloadedBook.upvotes);
                return res.status(201).json({ msg: `Downvotes increased to ${reloadedBook.downvotes}` });
              });
            // book.reload();
            // console.log(book.downvotes);
          }
          return res.status(403).json({ msg: 'Already downvoted book' });
        });
      })
      .catch(error => res.status(500).json({ msg: error }));
  }

  /* Method lets a user favorite a book
  * @param req is the request is the request object
  * @param res is the response object
  * @return favoriteBook object */
  static favoriteBook(req, res) {
    models.Book.findById(req.params.bookId)
      .then((book) => {
        if (!book) return res.status(404).json({ msg: 'Book not found' });

        return models.Favorites.findOrCreate({
          where: {
            bookId: req.params.bookId,
            userId: req.params.userId,
          },
        })
          .spread((favorite, created) => {
            if (created === true) {
              book.increment('favCount');
              return res.status(201).json({ msg: `Favorited book ${req.params.bookId}` });
            }
            return res.status(401).json({ msg: 'Already favorited book' });
          })
          .catch(error => res.status(400).send({
            msg: 'Error favoriting book', error,
          }));
      })
      .catch(error => res.status(400).json({
        msg: 'Error favoriting book', error,
      }));
  }

  /* Method gets a user's favorite books
  @param userId is used to find the index of the user in the
  users.json file and get favorites book if any */
  getFavoriteBooks(userId) {
    this.userId = userId;
  }
  /* Method lets a user review a book
  * @param req is the request is the request object
  * @param res is the response object
  * @return review object is */
  static reviewBook(req, res) {
    models.Book.findById(req.params.bookId)
      .then((book) => {
        if (!book) return res.status(404).json({ msg: 'Book not found' });

        return models.Review.findOrCreate({
          where: {
            bookId: req.params.bookId,
            userId: req.params.userId,
            review: req.body.review,
          },
        })
          .spread((review, created) => {
            if (created === true) {
              return res.status(201).json({ msg: `Successfully reviewed book ${req.params.bookId}`, review });
            }
            return res.status(403).json({ msg: 'Your review has already been created' });
          })
          .catch(error => res.status(400).send({
            msg: 'Error reviewing book', error,
          }));
      })
      .catch(error => res.status(400).json({
        msg: 'Error reviewing book', error,
      }));
  }

  /* Method lets a user send  a borrow request for a book
  @param userId is used to find the index of the user in the users.json file
  @param bookId  is used to find the index of the user in the users.json file
  @params reason, comments and returnDate are the user's reason, comments and
   the return date */
  sendBorrowRequest(userId, bookId, reason, returnDate, comments) {
    this.userId = userId;
    this.bookId = bookId;
    this.reason = reason;
    this.returnDate = returnDate;
    this.comments = comments;
  }

  /* Method lets a user send  a return request for a book
  @param userId is used to find the index of the user in the users.json file
  @param bookId  is used to find the index of the user in the users.json file
  @param comments is the user's comments */
  sendReturnRequest(userId, bookId, comments) {
    this.userId = userId;
    this.bookId = bookId;
    this.comments = comments;
  }
}
