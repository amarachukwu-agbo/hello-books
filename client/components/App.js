import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import SignUpPage from './SignUp/SignUpPage';
import LoginPage from './Login/LoginPage';
import IndexPage from './Index';
import Books from './Books';
import User from './User';

class App extends Component {
  render() {
    return (
            <Router history = { this.props.history }>
                <Switch>
                    <Route exact path = '/signup' component = { SignUpPage } />
                    <Route exact path = '/login' component = { LoginPage } />
                    <Route exact path = '/' component = { IndexPage } />
                    <Route path = '/books' component = { Books } />
                    <Route path = '/users' component = { User } />
                </Switch>
            </Router>
    );
  }
}

export default hot(module)(App);
