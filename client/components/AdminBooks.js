import React from 'react';

const AdminBooks = (props) => {
  const { books, deleteBook, isDeleting } = props;
  console.log(props);
  if (!books.length) {
    return (
        <div className="row center">
            <p className="grey-text">You have not added any books </p>
        </div>
    );
  }

  return (
        <div className="review">
            <h4 className="center">Books Catalog</h4>
            <div className="divider"></div>
            <table class="striped responsive-table">
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
                    { books.map((book, index) =>
                        <tr key={ index }>
                            <td> { book.title } </td>
                            <td> { book.author } </td>
                            <td> { book.imageURL } </td>
                            <td> { book.subject } </td>
                            <td>{ book.description } </td>
                            <td> { book.quantity } </td>
                            <td><a href="/addbook"><i class="material-icons">edit</i></a></td>
                            <td> <button className="btn-flat btn-small" disabled={ isDeleting }onClick={deleteBook.bind(null, book.id, index)}><i class="material-icons blue-text">delete</i></button></td>
                        </tr>)}
                </tbody>
            </table>
        </div>
  );
};

export default AdminBooks;
