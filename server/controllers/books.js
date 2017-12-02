// import Admin class
import Admin from '../module/Admin';

const bookControllers = {
  // Add a new book to database
  createBook(req, res) {
    // Check the role of user from decoded token
    // If 'User' return error else add book
    if (req.decoded.role !== 'Admin') {
      return res.status(401).json({
        msg: 'You are not authorized to add book',
      });
    }
    Admin.addBook(req, res);
  },
  // Update a book in the database
  updateBook(req, res) {
    // Check the role of user from decoded token
    // If 'User' return error else add book
    console.log(req.decoded.role);
    if (req.decoded.role !== 'Admin') {
      return res.status(401).send({
        msg: 'You are not authorised to update book',
      });
    }
    // Check if object is empty
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ msg: 'Nothing to update' });
    }
    // If not empty, update book
    Admin.updateBook(req, res);
  },
};

export default bookControllers;
