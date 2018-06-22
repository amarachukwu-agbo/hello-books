import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Preloader from './Preloader';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.renderFavorites = this.renderFavorites.bind(this);
  }

  componentDidMount() {
    const { getUserFavorites, user } = this.props;
    getUserFavorites(user.id);
  }

  renderFavorites() {
    const { isFetching, error, favorites } = this.props;
    if (isFetching) {
      return <div className="row center wrapper"><Preloader /></div>;
    }
    if (error) {
      return <div className="row center wrapper"> { this.props.error }</div>;
    }
    if (!favorites) {
      return <div className="row center wrapper primary-text"> You seem to have no favorites </div>;
    }

    if (favorites) {
      return favorites.map((favorite, index) => (
            <div className="row card-panel favorite-card" key = { index }>
              <div className="col s4 m3 l2 " style={{
                backgroundImage: `url(${favorite.favBook.imageURL})`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                minHeight: 'inherit',
                }} />

              <div className="col s8 m9 l10">
                  <p className="flow-text">
                    <span className="bold">Title: </span>
                    <span className=""><Link to = { `/books/${favorite.favBook.id}` }> { favorite.favBook.title } </Link></span>
                  </p>
                  <h6 className="author"><span>Author: </span><span> { favorite.favBook.author } </span></h6>
              </div>
            </div>
      ));
    }
  }

  render() {
    return (
        <div className="container wrapper">
            <div className="row center"> <h4 className="book-header"> Your Favorites </h4></div>
            <div className="row">
                { this.renderFavorites() }
            </div>
        </div>
    );
  }
}

export default Favorites;
