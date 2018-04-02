import React, { Component } from 'react';
import Modal from 'react-modal';
import EditBookForm from './EditBookForm';

class AdminBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.book = { bookId: '', bookIndex: '' };
  }

  toggleModal(bookId, bookIndex) {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
    this.book = { bookId, bookIndex };
    console.log(this.book);
  }

  render() {
    const { books, deleteBook, isDeleting } = this.props;
    const { isOpen } = this.state;
    console.log(this.props);
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
            <Modal isOpen = { isOpen } onRequestClose = { this.toggleModal } className="Modal"
            shouldCloseOnOverlayClick = { true } overlayClassName="Overlay" ariaHideApp = { false }>
                <div className="row">
                    <div className="col s1 m2 l3"></div>
                    <div className="card-panel col s12 m8 l6">
                        <EditBookForm index = { this.book.bookIndex } { ...this.props }
                        book = {this.props.books.find(book => book.id === this.book.bookId) } />
                    </div>
                    <div className="col s1 m2 l3"></div>
                </div>
            </Modal>
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
                            <td><button className="btn-flat btn-small" onClick= { this.toggleModal.bind(null, book.id, index) }><i class="material-icons blue-text">edit</i></button></td>
                            <td> <button className="btn-flat btn-small" disabled={ isDeleting } onClick={deleteBook.bind(null, book.id, index)}><i class="material-icons blue-text">delete</i></button></td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    );
  }
}

export default AdminBooks;
