import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import 'font-awesome/css/font-awesome.min.css';
import UserRoute from './Auth/UserRoute.jsx';
import GuestRoute from './Auth/GuestRoute.jsx';
import AdminRoute from './Auth/AdminRoute.jsx';
import SignUpPage from './SignUp/SignUpPage.jsx';
import LoginPage from './Login/LoginPage.jsx';
import IndexPage from './Index/Index.jsx';
import NotFound from './Common/NotFound.jsx';
import Books from './Books/Books.jsx';
import User from './User/User.jsx';
import Admin from './Admin/Admin.jsx';

/**
 * @description stateless component containing all other components
 *
 * @param {object} browser history
 *
 * @returns {Node}
 */
const App = ({ history }) => (
  <Router history={ history }>
    <Switch>
      <GuestRoute exact path='/signup' component={ SignUpPage } />
      <GuestRoute exact path='/login' component={ LoginPage } />
      <Route exact path='/' component={ IndexPage } />
      <Route path='/books' component={ Books } />
      <UserRoute path='/users' component={ User } />
      <AdminRoute path='/admin' component={ Admin } />
      <Route component={ NotFound } />
    </Switch>
  </Router>
);

export default hot(module)(App);
