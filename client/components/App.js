import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import 'font-awesome/css/font-awesome.min.css';
import PrivateRoute from './PrivateRoute';
import GuestRoute from './GuestRoute';
import AdminRoute from './AdminRoute';
import SignUpPage from './SignUp/SignUpPage';
import LoginPage from './Login/LoginPage';
import IndexPage from './Index';
import NotFound from './NotFound';
import Books from './Books';
import User from './User';
import Admin from './Admin';

class App extends Component {
  render() {
    return (
      <Router history={this.props.history}>
        <Switch>
          <GuestRoute exact path='/signup' component={SignUpPage} />
          <GuestRoute exact path='/login' component={LoginPage} />
          <Route exact path='/' component={IndexPage} />
          <Route path='/books' component={Books} />
          <PrivateRoute path='/users' component={User} />
          <AdminRoute path='/admin' component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default hot(module)(App);
