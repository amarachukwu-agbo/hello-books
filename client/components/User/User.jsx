import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../Navbar';
import PageFooter from '../PageFooter';
import Favorites from './Favorites.jsx';
import Profile from './Profile.jsx';
import NotFound from '../Common/NotFound.jsx';

/**
 * @description stateless component for handling all user routes
 *
 * @param {object} match - prop to match routes to current location
 *
 * @returns {Node} - react node containing the User component
 */
const User = ({ match }) => (
  <div>
        <Navbar />
        <Switch>
          <Route exact path={`${match.url}/:userId/favorites`}
            component={ Favorites }/>
          <Route exact path={`${match.url}/:userId/profile`}
            component={ Profile }/>
          )}/>
          <Route component={ NotFound } />
        </Switch>
        <PageFooter />
      </div>
);

export default User;
