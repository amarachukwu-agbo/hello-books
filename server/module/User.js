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
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(req.body.password, salt);
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
        res.status(201).send({ msg: 'Signup successful', token });
      })
      .catch(error => res.status(500).send(error));
  }
  /* Method implements user login
  @params email is used to find a user stored in the User's table
  @return user object
  */
  logIn(email, password) {
    this.email = email;
    this.password = password;

    return models.User
      .findOne({
        where:
          { email },
      });
  }

  /* Method votes up a book
  @param bookId is used to find the book in the
  Books table and the upvote count is incremented by 1 */
  findBook(bookId) {
    this.bookId = bookId;

    return models.Book
      .find({
        where:
         { id: bookId },
      });
  }

  /* Method votes down a book
  @param bookId is used to find the index of the book in the
  books.json file and the downvote count is incremented by 1 */
  downvoteBook(bookId) {
    this.bookId = bookId;
  }

  /* Method favorites up a book
  @param bookId is used to find the index of the book in the
  books.json file and increment favorites count if book is not
  already a user's favorite.
  @param userId is used to find the index of the user in users.json
  file and the bookId is added to user's favorites. */
  favoriteBook(userId, bookId) {
    this.bookId = bookId;
    this.userId = userId;
  }

  /* Method gets a user's favorite books
  @param userId is used to find the index of the user in the
  users.json file and get favorites book if any */
  getFavoriteBooks(userId) {
    this.userId = userId;
  }
  /* Method lets a user review a book
  @param userId is used to find the index of the user in the users.json file
  @param bookId  is used to find the index of the user in the users.json file
  @param review is the review which is added to reviews of a book */
  reviewBook(userId, bookId, review) {
    this.userId = userId;
    this.bookId = bookId;
    this.review = review;
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
