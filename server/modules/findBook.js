// import necessary module
import readData from './readData';

/* Function finds the index of a book in books.json file
@param bookId is the id of the book */
const findBookIndex = (bookId) => {
  const data = readData('./data/books.json');
  const index = data.books.findIndex(book => book.id === bookId);
  return index;
};

export default findBookIndex;