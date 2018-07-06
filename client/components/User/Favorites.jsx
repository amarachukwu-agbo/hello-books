import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import noFavorite from '../../public/images/fav2.png';
import getUserFavorites from '../../actions/favorites';
import Preloader from '../Common/Preloader.jsx';
import Pagination from '../Common/Pagination.jsx';

/**
 * @description container component for rendering a user's favorites
 *
 * @param {object} props - properties of the component
 *
 * @returns {Node} - react node containing the book component
 */
class Favorites extends Component {
  /**
   * @description creates a new instance of the component
   * @param {object} props component's props
   *
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.renderFavorites = this.renderFavorites.bind(this);
    this.getUserFavorites = this.getUserFavorites.bind(this);
  }

  /**
   * @method componentDidMount
   *
   * @description fetches user's favorites on page 1
   *
   * @returns {void}
   */
  componentDidMount() {
    this.getUserFavorites(1);
  }

  /**
   * @method getUserFavorites
   * @description gets a user's favorites
   * @param {Number} page - page of favorites to be fetched
   *
   * @returns {void}
   */
  getUserFavorites(page) {
    const { user } = this.props;
    this.props.getUserFavorites(user.id, page);
  }

  /**
   * @method renderFavorites
   *
   * @description renders user's favorites
   *
   * @returns {Node} react node containing favorites component
   */
  renderFavorites() {
    const { isFetching, error, favorites } = this.props;
    if (isFetching) {
      return (
        <div className="row center wrapper">
          <Preloader />
        </div>
      );
    }
    if (error) {
      return (
        <div className="row center wrapper">
          <div className="row card-panel">
            <h6 className="flow-text red-text">
              {`Oops! Couldn't fetch your favorites. ${this.props.error}`}
            </h6>
          </div>
        </div>
      );
    }
    if (favorites && !favorites.length) {
      return (
        <div className="row center wrapper grey-text">
        <img src={noFavorite} className="no-favorite-image"/>
          <h5>Looks like you have no favorites</h5>
          <h6>Click on the heart icon on a book's page to
            add it to your favorites.
          </h6>
        </div>
      );
    }

    if (favorites) {
      return (
        <div>
          <div>
            {favorites.map((favorite, index) =>
              <div className="row card-panel favorite-card" key={index}>
                <div className="col s4 m3 l2 " style={{
                  backgroundImage: `url(${favorite.favBook.imageURL})`,
                  backgroundPosition: 'center center',
                  backgroundSize: 'cover',
                  minHeight: 'inherit',
                }} />

                <div className="col s8 m9 l10">
                  <p className="flow-text">
                    <span className="bold">Title: </span>
                    <span className="">
                      <Link to={`/books/${favorite.favBook.id}`}>
                        {favorite.favBook.title}
                      </Link>
                    </span>
                  </p>
                  <h6 className="author">
                    <span>Author: </span>
                    <span>{favorite.favBook.author}</span>
                  </h6>
                </div>
              </div>)}
          </div>
          <Pagination pagination={this.props.pagination}
            onPageChange={page => this.getUserFavorites(page)}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="container wrapper">
        <div className="row center">
          <h4 className="book-header">
            Your Favorites
          </h4>
        </div>
        <div className="row">
          {this.renderFavorites()}
        </div>
      </div>
    );
  }
}

// Prop type validation
Favorites.propTypes = {
  isFetching: propTypes.bool,
  pagination: propTypes.object,
  favorites: propTypes.array,
  error: propTypes.string,
};

/**
 * @description maps state to props
 * @param {object} state - redux state
 *
 * @returns {object} props - props mapped to state
 */
const mapStateToProps = state => ({
  ...state.login,
  ...state.favorites,
});

/**
 * @description maps dispatch to props
 * @param {object} state - redux state
 *
 * @returns {object} props - props mapped to dispatch actions
 */
const mapDispatchToProps = dispatch => ({
  getUserFavorites: (userId, page) => {
    dispatch(getUserFavorites(userId, page));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

