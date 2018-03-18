import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import SignUpPage from './SignUp/SignUpPage';
import LoginPage from './Login/LoginPage';

class App extends Component {
  render() {
    return (
            <Router history = { this.props.history }>
                <Switch>
                    <Route path = '/signup' component = { SignUpPage } />
                    <Route path = '/login' component = { LoginPage } />
                </Switch>
            </Router>
    );
  }
}

export default hot(module)(App);
