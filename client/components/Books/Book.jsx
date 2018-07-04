import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * @description stateless component for rendering a book
 *
 * @param {object} props - properties of the component
 *
 * @returns {Node} - react node containing the book component
 */
const Book = (props) => {
  const { book } = props;
  return (
    <div className="col s6 m4 l3">
      <div className="card">
        <div className="card-image">
          <img src={book.imageURL} className="responsive-img" />
          <Link to={`/books/${book.id}`}
            className="btn-floating halfway-fab waves-effect
            waves-light small red">
            <i className="material-icons hoverable">chevron_right</i>
          </Link>
        </div>
        <div className="card-content">
          <span className="card-title truncate grey-text text-darken-4">
            {book.title}
          </span>
          <p className="truncate">Author|
            <span className="red-text text-darken-4 bold">{book.author}</span>
          </p>
          <p className="truncate"> Genre|
            <span className="red-text text-darken-4 bold">{book.subject}</span>
          </p>
          <p> Quantity|
            <span className="red-text text-darken-4 bold">{book.quantity}</span>
          </p>
          <div className="divider hide-on-med-and-down"></div>
          <div className="row hide-on-med-and-down">
            <div className="col s3 btn btn-small btn-flat white grey-text
            text-darken-2 book-icon">
              <i className="material-icons prefix">thumb_up</i>
              <span>{book.upvotes}</span></div>
              <div className="col s3 btn btn-small btn-flat white
              grey-text text-darken-2 book-icon">
                <i className="material-icons prefix">favorite_border</i>
                <span>{book.favCount}</span>
              </div>
            <div className="col s3 btn btn-samll btn-flat white
              grey-text text-darken-2 book-icon">
              <i className="material-icons prefix">comment</i>
              <span>{book.bookReviews.length}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Prop type validation
Book.propTypes = {
  book: propTypes.shape({
    author: propTypes.string.isRequired,
    subject: propTypes.string.isRequired,
    bookReviews: propTypes.array.isRequired,
    favCount: propTypes.number.isRequired,
    upvotes: propTypes.number.isRequired,
    downvotes: propTypes.number.isRequired,
    quantity: propTypes.number.isRequired,
    imageURL: propTypes.string.isRequired,
  }),
};

export default Book;
