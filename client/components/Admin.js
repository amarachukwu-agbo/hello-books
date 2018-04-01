import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import AdminBooks from './AdminBooks';
import Navbar from './Navbar';
import PageFooter from './PageFooter';
import Preloader from './Preloader';
import addBook from '../actions/addBook';
import { getBooks, deleteBook } from '../actions/books';
import BookForm from './BookForm';


class Admin extends Component {
  componentDidMount() {
    this.props.getBooks();
  }

  render() {
    const { match } = this.props;
    return (
        <div className="row">
            <Navbar />
            <div className="parallax-container z-depth-1 dashboard">
                    <div className="center-align">
                        <br/>
                        <h4 className="black-text text-darken-4 bold">Admin Dashboard</h4>
                    </div>
                </div>
                <br/>
            <Switch>
                <Route exact path = { `${match.url}`} render= {() => (
                    <div>
                    { this.props.isFetching &&
                        <div className="row center book-image">
                            <Preloader />
                        </div>
                    }
                    { this.props.error &&
                        <div className="row center book-image">
                            <h4 className="flow-text red-text"> {`Oops! Couldn't fetch available books. ${this.props.error}`} </h4>
                        </div>
                    }
                    { this.props.books &&
                        <AdminBooks books = { this.props.books } {...this.props }/>
                    }

                    </div>
                )} />
                <Route exact path = { `${match.url}/addBook`} render= {() => (
                    <div className="row">
                        <div className="col s1 m2 l3"></div>
                        <div className="card-panel col s12 m8 l6">
                            <BookForm { ...this.props }/>
                        </div>
                        <div className="col s1 m2 l3"></div>
                    </div>
                )} />
            </Switch>
            <br/>
            <PageFooter />
        </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.books,
  ...state.addBook,
});
const mapDispatchToProps = dispatch => ({
  getBooks: () => { dispatch(getBooks()); },
  deleteBook: (bookId, bookIndex) => { dispatch(deleteBook(bookId, bookIndex)); },
  addBook: (book) => { dispatch(addBook(book)); },
});
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
