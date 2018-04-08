import React, { Component } from 'react';
import Modal from 'react-modal';
import checkAuthentication from '../helpers/auth';
import BorrowBookForm from '../components/BorrowBookForm';

class BookDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.favBook = this.favBook.bind(this);
    this.upvoteBook = this.upvoteBook.bind(this);
    this.downvoteBook = this.downvoteBook.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  favBook() {
    checkAuthentication(this.props.isAuthenticated);
    this.props.favoriteBook(this.props.user.id, this.props.book.id);
  }

  upvoteBook() {
    checkAuthentication(this.props.isAuthenticated);
    this.props.upvoteBook(this.props.user.id, this.props.book.id);
  }

  downvoteBook() {
    checkAuthentication(this.props.isAuthenticated);
    this.props.downvoteBook(this.props.user.id, this.props.book.id);
  }

  render() {
    const { book } = this.props;
    const { isOpen } = this.state;
    console.log(this.props);
    return (
      <div className="row card-panel">
        <Modal isOpen = { isOpen } onRequestClose = { this.toggleModal } className="Modal"
        shouldCloseOnOverlayClick = { true } overlayClassName="Overlay" ariaHideApp = { false }>
            <div className="row">
                <div className="col s1 m2 l3"></div>
                <div className="card-panel col s12 m8 l6">
                    <BorrowBookForm { ...this.props }/>
                </div>
                <div className="col s1 m2 l3"></div>
            </div>
        </Modal>
        <div className="row center"><h4 className="book-header">{book.title}</h4> </div>
        <div className='divider'></div><br />
        <div className="row">
          <div className="col s12 m4 l4" ><img src={book.imageURL} className="responsive-img book-image" /></div>
          <div className="col s12 m8 l8">
            <p className="bold black-text">Author: <span> {book.author} </span></p>
            <div className='divider'></div>
            <p className="bold black-text">Category: <span> {book.subject} </span></p>
            <div className='divider'></div>
            <p className="bold black-text">Copies Borrowed: <span> {book.borrowCount} </span></p>
            <div className='divider'></div>
            <p className="bold black-text">Copies Available: <span> {book.quantity} </span></p>
            <div className='divider'></div>
            <p className="bold black-text">Description: <span> {book.description} </span></p>
            <div className='divider'></div><br />
            <div>
              <button className="btn btn-small red" onClick = { this.toggleModal } disabled= { !this.props.isAuthenticated }>
                Borrow Book</button>
              <div className="left">
                <button className="btn btn-small white teal-text left" onClick={this.upvoteBook} disabled={this.props.isUpvoting}>
                  <i className="material-icons prefix">thumb_up</i><span>{book.upvotes}</span>
                </button>
                <button className="btn btn-small white teal-text left" onClick={this.downvoteBook} disabled={this.props.isDownvoting}>
                  <i className="material-icons prefix">thumb_down</i><span>{book.downvotes}</span>
                </button>
                <button className="btn btn-small white teal-text left" disabled={this.props.isFavoriting} onClick={this.favBook}>
                  <i className="material-icons prefix">favorite_border</i><span>{book.favCount}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BookDetails;
