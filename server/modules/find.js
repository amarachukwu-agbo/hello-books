// import necessary module
import readData from './readData';

/* Function finds the index of a request
@params userId, bookId are the ids of the user 
and the book in the request.
@params file is the json file with the request objects */

const find = (userId, bookId, file) => {
  const data = readData(file);
  const index = data.requests.findIndex(request =>
    request.userId === userId && request.bookId === bookId);
  return index;
};

export default find;