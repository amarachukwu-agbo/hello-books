import React, { Component } from 'react';
import { Modal } from 'react-materialize';
import EditBookForm from './EditBookForm';

class AdminBooks extends Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      book: { bookId: '', bookIndex: '' },
    };
  }

  setBook = (bookId, bookIndex) => {
    this.setState({ book: { bookId, bookIndex } });
    this.toggleModal();
  }


  toggleModal = () => {
    $('#edit-modal').modal('open');
  }

  render() {
    const { books, deleteBook, isDeleting } = this.props;
    if (!books.length) {
      return (
        <div className="row wrapper center">
            <p className="grey-text">You have not added any books</p>
        </div>
      );
    }

    return (
        <div>
            <h5 className="book-header center">Books Catalog</h5>
            <div className="divider"></div>
            <Modal id="edit-modal" actions={null} >
                <div className="container">
                        <EditBookForm index = { this.state.book.bookIndex } { ...this.props }
                         book = {this.state.book}/>
                    </div>
            </Modal>
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
                    { books.map((book, index) =>
                        <tr key={ index }>
                            <td> { book.title } </td>
                            <td> { book.author } </td>
                            <td> { book.imageURL } </td>
                            <td> { book.subject } </td>
                            <td>{ book.description } </td>
                            <td> { book.quantity } </td>
                            <td><button id= { `editButton${index}` } className="btn-flat btn-small" onClick= { () => { this.setBook(book.id, index); }}><i className="material-icons primary-text">edit</i></button></td>
                            <td> <button id = {`deleteButton${index}` } className="btn-flat btn-small" disabled={ isDeleting } onClick={ () => { deleteBook(book.id, index); }}><i className="material-icons red-text">delete</i></button></td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    );
  }
}

export default AdminBooks;
