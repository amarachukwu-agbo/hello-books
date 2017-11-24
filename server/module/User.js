// Import necessary modules
import models from '../models';


export default class Users {
  signUp(firstName, lastName, email, role, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
    this.password = password;

    return models.User
      .create({
        firstName,
        lastName,
        email,
        role,
        password,
      });
  }
  /* Method votes up a book
  @param bookId is used to find the index of the book in the
  books.json file and the upvote count is incremented by 1 */
  upvoteBook(bookId) {
    this.bookId = bookId;
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
