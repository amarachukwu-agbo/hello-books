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
    console.log(this.props);
    const { isFetching, error, favorites } = this.props;
    if (isFetching) {
      return <div className="row center book-image"><Preloader /></div>;
    }
    if (error) {
      return <div className="row center book-image"> { this.props.error }</div>;
    }
    if (favorites) {
      return favorites.map((favorite, index) => (
            <div className="row card-panel" key = { index }>
              <div className="col s4 m3 l2">
                <img src= { `${favorite.favBook.imageURL}` } className="favorite-img" />
              </div>
              <div className="col s8 m9 l10">
                  <h6 className="flow-text">
                    <span className="bold">Title: </span>
                    <span><Link to = { `/books/${favorite.favBook.id}` }> { favorite.favBook.title } </Link></span>
                  </h6>
                  <p><span className="bold">Author: </span><span> { favorite.favBook.author } </span></p>
                  <div className="row">
                    <button className="btn btn-small waves-effect red" >Borrow book</button>
                  </div>
              </div>
            </div>
      ));
    }
  }

  render() {
    return (
        <div className="container">
            <div className="row center"> <h4 className="book-header"> Your Favorites </h4></div>
            <div className="row">
                { this.renderFavorites() }
            </div>
        </div>
    );
  }
}

export default Favorites;
