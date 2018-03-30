import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import PageFooter from './PageFooter';
import Favorites from './Favorites';
import getUserFavorites from '../actions/favorites';

const User = props => (
  <div>
        <Navbar />
        <Switch>
          <Route exact path={`${props.match.url}/:userId/favorites`} render= { () => (
            <Favorites { ...props } />
          )}/>
        </Switch>
        <PageFooter />
      </div>
);

const mapStateToProps = state => ({
  ...state.login,
  ...state.favorites,
});
const mapDispatchToProps = dispatch => ({
  getUserFavorites: (userId) => { dispatch(getUserFavorites(userId)); },
});
export default connect(mapStateToProps, mapDispatchToProps)(User);
