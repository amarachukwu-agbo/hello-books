import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import PageFooter from './PageFooter';
import Favorites from './Favorites';
import Profile from './Profile';
import getUserFavorites from '../actions/favorites';
import getUserProfile from '../actions/profile';

const User = props => (
  <div>
        <Navbar />
        <Switch>
          <Route exact path={`${props.match.url}/:userId/favorites`} render= { () => (
            <Favorites { ...props } />
          )}/>
          <Route exact path={`${props.match.url}/:userId/profile`} render= { () => (
            <Profile { ...props } />
          )}/>
        </Switch>
        <PageFooter />
      </div>
);

const mapStateToProps = state => ({
  ...state.login,
  ...state.favorites,
  ...state.profile,
});
const mapDispatchToProps = dispatch => ({
  getUserFavorites: (userId) => { dispatch(getUserFavorites(userId)); },
  getUserProfile: (userId) => { dispatch(getUserProfile(userId)); },
});
export default connect(mapStateToProps, mapDispatchToProps)(User);
