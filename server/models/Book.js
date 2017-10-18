import jsonfile from 'jsonfile';

export default class Book {

  addBook(id, title, author, description, imageURL, subject, quantity) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.description = description;
    this.imageURL = imageURL;
    this.subject = subject;
    this.quantity = quantity;

    const obj = {id, title, author, description, imageURL, subject, quantity };
    let data = jsonfile.readFileSync('./data/books.json');
    data.books.push(obj);
    jsonfile.writeFileSync('./data/books.json', data, { spaces: 2, EOL: '\r\n' });
    data = jsonfile.readFileSync('./data/books.json');
    return data.books;
  }

  updateBook(id, title, author, description, imageURL, subject, quantity) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.description = description;
    this.imageURL = imageURL;
    this.subject = subject;
    this.quantity = quantity;

    const obj = { id, title, author, description, imageURL, subject, quantity };
    let data = jsonfile.readFileSync('./data/books.json');
    const objIndex = data.books.findIndex(book => book.id === obj.id);
    data.books[objIndex] = obj;
    if (objIndex < 0) return ('Cannot Update unavailable book');
    jsonfile.writeFileSync('./data/books.json', data, { spaces: 2, EOL: '\r\n' });
    data = jsonfile.readFileSync('./data/books.json');
    return data.books;
  }
}
