// Import necessary modules

import User from '../models/User';
import readData from '../modules/readData';
import writeData from '../modules/writeData';
import findUser from '../modules/findUser';
import findBook from '../modules/findBook';
import find from '../modules/find';
import updateData from '../modules/updateData';

const createdDate = new Date();
const booksFile = './data/books.json';
const usersFile = './data/users.json';
const borrowReqFile = './data/borrowrequests.json';
const borrowedBooksFile = './data/borrowedbooks.json';
const returnReqFile = './data/returnrequests.json';

export default class Admin extends User {
  /* Method adds a book
  @param bookId is the book's id
  @param title is the book's title
  @param author is the book's author
  @param description is the book's description
  @param imageURL is the book's image URL
  @param subject is the book's subject
  @param quantity is the book's quantity
  */
  addBook(id, title, author, description, imageURL, subject, quantity) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.description = description;
    this.imageURL = imageURL;
    this.subject = subject;
    this.quantity = quantity;

    // Check if all arguments are available
    if (
      id === undefined ||
      author === undefined ||
      description === undefined ||
      imageURL === undefined ||
      subject === undefined ||
      quantity === undefined
    ) {
      return { statusCode: '400', message: 'Some fields missing' };
    }

    const data = readData(booksFile);
    const obj = {
      id,
      title,
      author,
      description,
      imageURL,
      subject,
      quantity,
    };
    data.books.push(obj);
    updateData(booksFile, data);
    return { statusCode: '201', message: obj };
  }

  /* Method modifies a book
  @param bookId is the book's id
  @param title is the book's title
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

    // Check if book id is valid
    const index = findBook(id);
    if (index < 0) return { statusCode: '404', message: 'Book not found' };

    // Check if all arguments are available
    if (
      author === undefined ||
      description === undefined ||
      imageURL === undefined ||
      subject === undefined ||
      quantity === undefined
    ) {
      return { statusCode: '400', message: 'Some fields missing' };
    }

    const obj = {
      id,
      title,
      author,
      description,
      imageURL,
      subject,
      quantity,
    };
    const data = readData(booksFile);
    const objIndex = findBook(id);
    data.books[objIndex] = obj;
    if (objIndex < 0) return ('Book not Found');
    updateData(booksFile, data);
    return { statusCode: '201', message: 'Successfully Updated book' };
  }

  /* Method accepts or declines a borrow request
  @param bookId is the book's id
  @param action takes in 'Accept' or 'Decline'
  */
  handleBorrowRequest(userId, bookId, action) {
    this.userId = userId;
    this.bookId = bookId;
    this.action = action;

    const data = readData(borrowReqFile);
    const requestIndex = find(userId, bookId, borrowReqFile);
    const booksData = readData(booksFile);
    const bookIndex = findBook(bookId);
    const usersData = readData(usersFile);
    const userIndex = findUser(userId);
    const borrowed = readData(borrowedBooksFile);
    const borrowDate = createdDate;
    let obj;
    let notification;

    switch (action) {
      case 'Accept':

        // Decrement book quantity
        booksData.books[bookIndex].quantity -= 1;
        if (booksData.books[bookIndex].borrowCount) {
          booksData.books[bookIndex].borrowCount += 1;
        } else {
          booksData.books[bookIndex].borrowCount = 1;
        }
        obj = {
          userId,
          bookId,
          borrowDate,
        };

        // Push request to borrowed books file
        borrowed.requests.push(obj);

        // Push request to user's borrowed books
        if (usersData.users[userIndex].borrowedBooks) {
          usersData.users[userIndex].borrowedBooks.push(bookId);
        } else {
          usersData.users[userIndex].borrowedBooks = [bookId];
        }

        // Remove request from borrow requests
        data.requests.splice(requestIndex, 1);

        // update modified files
        writeData(borrowReqFile, data);
        writeData(booksFile, booksData);
        writeData(usersFile, usersData);
        writeData(borrowedBooksFile, borrowed);
        return { statusCode: '201', message: `Successfully borrowed book ${bookId}` };

      case 'Decline':

        // Put notification in user's notifications
        notification = `Your request to borrow book ${bookId} was declined`;
        if (usersData.users[userIndex].notifications) {
          usersData.users[userIndex].notifications.push(notification);
        } else {
          usersData.users[userIndex].notifications = [notification];
        }

        // Remove request from borrow requests
        data.requests.splice(requestIndex, 1);

        // Update modified files
        writeData(usersFile, usersData);
        writeData(borrowReqFile, data);
        return { statusCode: '201', message: notification };

      default:
        return { statusCode: '400', message: 'Bad request' };
    }
  }

  /* Method accepts or declines a return request
  @param bookId is the book's id
  @param action takes in 'Accept' or 'Decline'
  */
  handleReturnRequest(userId, bookId, action) {
    this.userId = userId;
    this.bookId = bookId;
    this.action = action;

    const requestIndex = find(userId, bookId, returnReqFile);
    const data = readData(returnReqFile);
    const booksData = readData(booksFile);
    const bookIndex = findBook(bookId);
    const usersData = readData(usersFile);
    const userIndex = findUser(userId);
    const borrowed = readData(borrowedBooksFile);
    const borrowedIndex = find(userId, bookId, borrowedBooksFile);
    const index = usersData.users[userIndex].borrowedBooks.findIndex(book =>
      book === bookId);
    let notification;

    switch (action) {
      case 'Accept':

        // Increment book quantity
        booksData.books[bookIndex].quantity += 1;

        // Remove from borrowedbooks.json
        borrowed.requests.splice(borrowedIndex, 1);

        // Remove book from user's borrowed books
        usersData.users[userIndex].borrowedBooks.splice(index, 1);

        // Remove return request from returnrequests.json
        data.requests.splice(requestIndex, 1);

        // Update modified files
        writeData(returnReqFile, data);
        writeData(booksFile, booksData);
        writeData(usersFile, usersData);
        writeData(borrowedBooksFile, borrowed);
        return { statusCode: '201', message: `Successfully returned book ${bookId}` };

      case 'Decline':
        // Add notiication to user's notifications
        notification = `Your request to return book ${bookId} was declined`;
        if (usersData.users[userIndex].notifications) {
          usersData.users[userIndex].notifications.push(notification);
        } else {
          usersData.users[userIndex].notifications = [notification];
        }

        // Remove request from return requests
        data.requests.splice(requestIndex, 1);

        // Update modified files
        writeData(usersFile, usersData);
        writeData(returnReqFile, data);
        return { statusCode: '201', message: notification };

      default:
        return { statusCode: '400', message: 'Bad request' };
    }
  }
}
