// Import necessary modules
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

export default class User {
  /* Method votes up a book
  @param bookId is used to find the index of the book in the
  books.json file and the upvote count is incremented by 1 */
  upvoteBook(bookId) {
    this.bookId = bookId;

    // Check if book is in books.json file
    let booksData = readData(booksFile);
    const bookIndex = findBook(bookId);
    if (bookIndex < 0) return ('Cannot Upvote unavailable book');

    // Increment count
    if (booksData.books[bookIndex].upvotes) {
      booksData.books[bookIndex].upvotes += 1;
    } else {
      booksData.books[bookIndex].upvotes = 1;
    }
    booksData = updateData(booksFile, booksData);
    return booksData.books[bookIndex];
  }

  /* Method votes down a book
  @param bookId is used to find the index of the book in the
  books.json file and the downvote count is incremented by 1 */
  downvoteBook(bookId) {
    this.bookId = bookId;

    // Check if book is available in books.json file
    let booksData = readData(booksFile);
    const bookIndex = findBook(bookId);
    if (bookIndex < 0) return ('Cannot Downvote unavailable book');

    // Increment downvote count
    if (booksData.books[bookIndex].downvotes) {
      booksData.books[bookIndex].downvotes += 1;
    } else {
      booksData.books[bookIndex].downvotes = 1;
    }
    booksData = updateData(booksFile, booksData);
    return booksData.books[bookIndex];
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

    // Check if user and book are in database
    let booksData = readData(booksFile);
    const bookIndex = findBook(bookId);
    const usersData = readData(usersFile);
    const userIndex = findUser(userId);
    if (userIndex < 0) return ('Cannot Find user');
    if (bookIndex < 0) return ('Cannot Favorite unavailable book');

    /* Check if book is already a user's favorite. If not add to
    user's favorites and increment book's favorite count in books.json file */
    if (usersData.users[userIndex].favorites) {
      const index = usersData.users[userIndex].favorites.findIndex(fav => fav === bookId);
      if (index < 0) {
        usersData.users[userIndex].favorites.push(bookId);
        if (booksData.books[bookIndex].favorites) {
          booksData.books[bookIndex].favorites += 1;
        } else {
          booksData.books[bookIndex].favorites = 1;
        }
      } else return ('Already made book a favorite');
    } else {
      usersData.users[userIndex].favorites = [bookId];
      if (booksData.books[bookIndex].favorites) {
        booksData.books[bookIndex].favorites += 1;
      } else {
        booksData.books[bookIndex].favorites = 1;
      }
    }

    // Update modified files
    writeData(usersFile, usersData);
    booksData = updateData(booksFile, booksData);
    return booksData.books[bookIndex];
  }

  /* Method gets a user's favorite books
  @param userId is used to find the index of the user in the
  users.json file and get favorites book if any */
  getFavoriteBooks(userId) {
    this.userId = userId;
    // Check if user is in database
    const usersData = readData(usersFile);
    const userIndex = findUser(userId);
    if (userIndex < 0) return ('Cannot Find user');

    // Check if user has favorite books
    if (!usersData.users[userIndex].favorites) return ('No Favorite books');

    // Push each favorite book to favorites book array
    const booksData = readData(booksFile);
    const favoritesArray = usersData.users[userIndex].favorites;
    let favoriteBooks = [];
    favoritesArray.forEach((fav) => {
      const bookObject = booksData.books.filter(book => book.id === fav);
      favoriteBooks = [...favoriteBooks, ...bookObject];
    });
    return favoriteBooks;
  }

  /* Method lets a user review a book
  @param userId is used to find the index of the user in the users.json file
  @param bookId  is used to find the index of the user in the users.json file
  @param review is the review which is added to reviews of a book */
  reviewBook(userId, bookId, review) {
    this.userId = userId;
    this.bookId = bookId;
    this.review = review;

    // Check if book and user are in the database
    let booksData = readData(booksFile);
    const bookIndex = findBook(bookId);
    const userIndex = findUser(userId);
    if (userIndex < 0) return ('Cannot Find user');
    if (bookIndex < 0) return ('Cannot review unavailable book');

    // Push review to book's reviews array
    if (review === undefined) return ('Bad request, empty body');
    if (booksData.books[bookIndex].reviews) {
      const obj = {};
      obj[userId] = review;
      booksData.books[bookIndex].reviews.push(obj);
    } else {
      booksData.books[bookIndex].reviews = [{ userId: review }];
    }
    booksData = updateData(booksFile, booksData);
    return booksData.books[bookIndex];
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

    // Check if user and book are available in database
    const booksData = readData(booksFile);
    const index = findBook(bookId);
    const userIndex = findUser(userId);
    if (userIndex < 0) return ('User not found');
    if (index < 0) return ('Book not found');
    if (booksData.books[index].quantity === 0) {
      return ('Book not Available');
    }

    // Check if user has sent request before
    const borrowReq = readData(borrowReqFile);
    const reqIndex = find(userId, bookId, borrowReqFile);
    if (reqIndex >= 0) return 'Already Sent request';

    // Push request to borrowrequests.json file
    const obj = {
      userId,
      bookId,
      reason,
      returnDate,
      comments,
      createdDate,
    };
    borrowReq.requests.push(obj);
    writeData(borrowReqFile, borrowReq);
    return obj;
  }

  /* Method lets a user send  a return request for a book
  @param userId is used to find the index of the user in the users.json file
  @param bookId  is used to find the index of the user in the users.json file
  @param comments is the user's comments */
  sendReturnRequest(userId, bookId, comments) {
    this.userId = userId;
    this.bookId = bookId;
    this.comments = comments;

    // Check if user and book are available in database
    const userIndex = findUser(userId);
    if (userIndex < 0) return ('User not found');
    const index = find(userId, bookId, borrowedBooksFile);
    if (index < 0) return ('Cannot send request; book not borrowed');

    // Check if user has sent request before
    const returnrequests = readData(returnReqFile);
    const requestIndex = find(userId, bookId, returnReqFile);
    if (requestIndex >= 0) return ('Already sent return request');

    // Push request to returnrequests.json
    const obj = {
      userId,
      bookId,
      comments,
      createdDate,
    };
    returnrequests.requests.push(obj);
    writeData(returnReqFile, returnrequests);
    return obj;
  }
}
