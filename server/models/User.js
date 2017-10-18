import jsonfile from 'jsonfile';

export default class User {

  upvoteBook(bookId) {
    this.bookId = bookId;
    let booksData = jsonfile.readFileSync('./data/books.json');
    const bookIndex = booksData.books.findIndex(book => book.id === bookId);
    if (bookIndex < 0) return ('Cannot Upvote unavailable book');
    if (booksData.books[bookIndex].upvotes) {
      booksData.books[bookIndex].upvotes += 1;
    } else {
      booksData.books[bookIndex].upvotes = 1;
    }
    jsonfile.writeFileSync('./data/books.json', booksData, { spaces: 2, EOL: '\r\n' });
    booksData = jsonfile.readFileSync('./data/books.json');
    return booksData.books;
  }

  downvoteBook(bookId) {
    this.bookId = bookId;
    let booksData = jsonfile.readFileSync('./data/books.json');
    const bookIndex = booksData.books.findIndex(book => book.id === bookId);
    if (bookIndex < 0) return ('Cannot Downvote unavailable book');
    if (booksData.books[bookIndex].downvotes) {
      booksData.books[bookIndex].downvotes += 1;
    } else {
      booksData.books[bookIndex].downvotes = 1;
    }
    jsonfile.writeFileSync('./data/books.json', booksData, { spaces: 2, EOL: '\r\n' });
    booksData = jsonfile.readFileSync('./data/books.json');
    return booksData.books;
  }
}

