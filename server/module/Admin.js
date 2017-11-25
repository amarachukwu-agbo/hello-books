// Import necessary modules
import models from '../models';
import Users from '../module/User';

export default class Admin extends Users {
  /* Method adds a book
  @param bookId is the book's id
  @param title is the book's title
  @param author is the book's author
  @param description is the book's description
  @param imageURL is the book's image URL
  @param subject is the book's subject
  @param quantity is the book's quantity
  */
  addBook(title, author, description, imageURL, subject, quantity) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.imageURL = imageURL;
    this.subject = subject;
    this.quantity = quantity;

    return models.Book
      .create({
        title,
        author,
        description,
        subject,
        imageURL,
        quantity,
      });
  }

  /* Method modifies a book
  @param bookId is the book's id
  @param title is the book's <title></title>
  @param author is the book's author
  @param description is the book's description
  @param imageURL is the book's image URL
  @param subject is the book's subject
  @param quantity is the book's quantity
  */
  updateBook(id, title, author, description, imageURL, subject, quantity) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.description = description;
    this.imageURL = imageURL;
    this.subject = subject;
    this.quantity = quantity;
  }

  /* Method accepts or declines a borrow request
  @param bookId is the book's id
  @param action takes in 'Accept' or 'Decline'
  */
  handleBorrowRequest(userId, bookId, action) {
    this.userId = userId;
    this.bookId = bookId;
    this.action = action;
  }

  /* Method accepts or declines a return request
  @param bookId is the book's id
  @param action takes in 'Accept' or 'Decline'
  */
  handleReturnRequest(userId, bookId, action) {
    this.userId = userId;
    this.bookId = bookId;
    this.action = action;
  }
}
