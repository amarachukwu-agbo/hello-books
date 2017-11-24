// import Admin class
import Admin from '../module/Admin';

module.exports = {
  // Add a new book to database
  createBook(req, res) {
    new Admin().addBook(
      req.body.title,
      req.body.author,
      req.body.description,
      req.body.imageURL,
      req.body.subject,
      req.body.quantity,
    )
      .then(result => res.status(201).send(result))
      .catch(error => res.status(400).send(error));
  },
};
