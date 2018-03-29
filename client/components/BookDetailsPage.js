import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBook, favoriteBook, upvoteBook, downvoteBook, borrowBook, reviewBook } from '../actions/book';
import PreLoader from './Preloader';
import BookDetails from './BookDetails';
import Review from './Reviews';

class BookDetailsPage extends Component {
  componentDidMount() {
    const bookId = parseInt(this.props.match.params.bookId, 10);
    this.props.getBook(bookId);
  }

  render() {
    if (this.props.isFetching) {
      return (
                <div className="container">
                    <div className="row center" style={{ minHeight: '500px' }}>
                    <br/><br/><PreLoader /></div>
                </div>
      );
    }
    if (this.props.error) {
      return (
                <div className="row center" style={{ minHeight: '500px' }}>
                   <br/><div className="container"><h4 className="flow-text red-text"> {`Oops! Couldn't fetch requested book. ${this.props.error}`} </h4></div>
                </div>
      );
    }
    return (
            <div className="container">
                { this.props.book && <BookDetails book = { this.props.book } { ...this.props }/> }
                <br/>
              { this.props.book &&
                <Review reviews = { this.props.book.bookReviews } { ...this.props }/>
              }
            </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.book,
  ...state.login,
});
const mapDispatchToProps = dispatch => ({
  getBook: (bookId) => { dispatch(getBook(bookId)); },
  favoriteBook: (userId, bookId) => { dispatch(favoriteBook(userId, bookId)); },
  upvoteBook: (userId, bookId) => { dispatch(upvoteBook(userId, bookId)); },
  downvoteBook: (userId, bookId) => { dispatch(downvoteBook(userId, bookId)); },
  borrowBook: (userId, bookId) => { dispatch(borrowBook(userId, bookId)); },
  reviewBook: (userId, bookId, review) => { dispatch(reviewBook(userId, bookId, review)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailsPage);
