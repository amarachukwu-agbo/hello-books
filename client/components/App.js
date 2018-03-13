import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import SignUpForm from './SignUpForm';

class App extends Component {
    render() {
        return(
            <Router history = { this.props.history }>
                <Switch>
                    <Route path = '/signup' component = { SignUpForm }/>
                </Switch>
            </Router>
        )
    }
    
}

export default App;