// import Admin class
import Admin from '../module/Admin';

module.exports = {
  // Add a new book to database
  createBook(req, res) {
    // Check the role of user from decoded token
    // If 'User' return error else add book
    if (req.decoded.role !== 'Admin') return res.status(401).send({ msg: 'Unauthorized user' });
    new Admin().addBook(
      req.body.title,
      req.body.author,
      req.body.description,
      req.body.imageURL,
      req.body.subject,
      req.body.quantity,
    )
      .then(result => res.status(201).send(result))
      .catch(error => res.status(500).send(error));
  },
};
