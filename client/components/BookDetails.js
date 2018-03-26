import React, { Component } from 'react';
import checkAuthentication from '../helpers/auth';

class BookDetails extends Component {
  constructor(props) {
    super(props);
    this.favBook = this.favBook.bind(this);
  }

  favBook() {
    const {
      isAuthenticated,
      favoriteBook,
      user,
      book,
    } = this.props;

    checkAuthentication(isAuthenticated);
    favoriteBook(user.id, book.id);
  }

  render() {
    const { book } = this.props;
    console.log(this.props);
    return (
            <div className="row card-panel">
              <div className = "row center"><h4 className="book-header">{ book.title }</h4> </div>
              <div className = 'divider'></div><br/>
              <div className="z-index-2">
                  <div className="col s12 m4 l4" ><img src= {book.imageURL} className="responsive-img book-image"/></div>
                  <div className="col s12 m8 l8">
                      <p className="bold black-text">Author: <span> { book.author } </span></p>
                      <div className = 'divider'></div>
                      <p className = "bold black-text">Category: <span> { book.subject } </span></p>
                      <div className = 'divider'></div>
                      <p className = "bold black-text">Copies Borrowed: <span> { book.borrowCount } </span></p>
                      <div className = 'divider'></div>
                      <p className = "bold black-text">Copies Available: <span> { book.quantity } </span></p>
                      <div className = 'divider'></div>
                      <p className = "bold black-text">Description: <span> { book.description } </span></p>
                      <div className = 'divider'></div><br/>
                      <div>
                          <button className="btn btn-small red">Borrow Book</button>
                          <div className="left">
                          <button className="btn btn-small white teal-text left"><i className="material-icons prefix">thumb_up</i><span>{book.upvotes}</span></button>
                          <button className="btn btn-small white teal-text left"><i className="material-icons prefix">thumb_down</i><span>{book.downvotes}</span></button>
                          <button className="btn btn-small white teal-text left" disabled = { this.props.isFavoriting } onClick={ this.favBook }>
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
