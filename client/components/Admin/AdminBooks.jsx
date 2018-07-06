import React from 'react';
import propTypes from 'prop-types';

/**
 * @description stateless component form for rendering books
 * on the admin dashborad
 *
 * @param {func} deleteBook - handles deletion of a book
 * @param {boolean} isDeleting - provides information about the deleting action
 * @param {func} setBookForEddit - sets the book to be edited
 * @param {array} books - books in the application
 *
 * @returns {Node} - react node containing a table of books
 */
const AdminBooks = ({
  books,
  deleteBook,
  isDeleting,
  setBookForEdit,
}) => {
  if (!books.length) {
    return (
      <div className="row wrapper center">
        <p className="grey-text">You have not added any books</p>
      </div>
    );
  }

  return (
    <div>
      <table className="striped responsive-table">
        <thead>
          <tr>
            <th>Book</th>
            <th>Author</th>
            <th>Image URL</th>
            <th>Subject</th>
            <th>Description</th>
            <th>Quantity</th>
            <th colSpan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) =>
            <tr key={index}>
              <td> {book.title} </td>
              <td> {book.author} </td>
              <td> {book.imageURL} </td>
              <td> {book.subject} </td>
              <td>{book.description} </td>
              <td> {book.quantity} </td>
              <td><button id={`editButton${index}`}
                className="btn-flat btn-small" onClick={() => {
                  setBookForEdit(book.id, index);
                  }}>
                  <i className="material-icons primary-text">edit</i>
                  </button>
              </td>
              <td>
                <button id={`deleteButton${index}`}
                  className="btn-flat btn-small"
                  disabled={isDeleting}
                  onClick={() => { deleteBook(book.id); }}>
              <i className="material-icons red-text">delete</i></button></td>
            </tr>)}
        </tbody>
      </table>
    </div>
  );
};

// Prop type validation
AdminBooks.propTypes = {
  books: propTypes.array.isRequired,
  deleteBook: propTypes.func.isRequired,
  isDeleting: propTypes.bool,
  setBookForEdit: propTypes.func.isRequired,
};

export default AdminBooks;
