import { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import SignUpPage from './SignUp/SignUpPage';

class App extends Component {
    render() {
        return (
            <Router history = { this.props.history }>
                <Switch>
                    <Route path = '/signup' component = { SignUpPage } />
                </Switch>
            </Router>
        )
    }
}

export default hot(module)(App);
