import React from 'react';
import { Link } from 'react-router-dom';

const Book = (props) => {
  const { book } = props;
  return (
        <div className="col s12 m6 l4">
            <div className="card">
                <div className="card-image">
                    <img src = { book.imageURL } className="responsive-img" />
                    <Link to= { `/books/${book.id}`} className="btn-floating halfway-fab waves-effect waves-light small red">
                        <i className="material-icons">chevron_right</i>
                    </Link>
                </div>
                <div className="card-content">
                    <span className="card-title truncate grey-text text-darken-4"> { book.title } </span>
                    <p> Author| <span className="red-text text-darken-4 bold"> { book.author} </span></p>
                    <p> Genre| <span className="red-text text-darken-4 bold"> {book.subject} </span></p>
                    <p> Quantity| <span className="red-text text-darken-4 bold"> { book.quantity} </span></p>
                    <div className="divider"></div>
                    <div className="row">
                        <div className="col s3 btn btn-small btn-flat white teal-text book-icon"><i className="material-icons prefix">thumb_up</i><span>{book.upvotes}</span></div>
                        <div className="col s3 btn btn-small btn-flat white teal-text book-icon"><i className="material-icons prefix">favorite_border</i><span>{book.favCount}</span></div>
                        <div className="col s3 btn btn-samll btn-flat white teal-text book-icon"><i className="material-icons prefix">comment</i><span>{book.bookReviews.length}</span></div>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default Book;
