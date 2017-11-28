// import Admin class
import Admin from '../module/Admin';

const bookControllers = {
  // Add a new book to database
  createBook(req, res) {
    // Check the role of user from decoded token
    // If 'User' return error else add book
    if (req.decoded.role !== 'Admin') return res.status(401).send({ msg: 'Unauthorized user' });
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.quantity ||
      !req.body.subject ||
      !req.body.imageURL ||
      !req.body.description
    ) return res.status(400).json({ msg: 'Some field missing' });
    Admin.addBook(req, res);
  },

  updateBook(req, res) {
    // Check the role of user from decoded token
    // If 'User' return error else add book
    if (req.decoded.role !== 'Admin') return res.status(401).send({ msg: 'Unauthorized user' });
    if (!req.body) return res.status(400).send({ msg: 'Nothing to update' });
    Admin.updateBook(req, res);
  },
};

export default bookControllers;
