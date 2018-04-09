import React from 'react';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

/**
 * Private route to navigate over private routes
 * If not logged in - goes to login
 */

class PrivateRoute extends React.Component {
  render() {
    const {
      isAuthenticated,
      component: Component,
      ...rest
    } = this.props;

    return (
            <Route
                {...rest}
                render={props =>
                    (isAuthenticated
                        ?
                            <Component {...props} />
                        : (
                            <Redirect to={{
                                pathname: '/login',
                                state: { from: props.location },
                            }} />
                        ))
                }
            />
    );
  }
}

const mapStateToProps = state => ({
  ...state.login,
});

export default connect(mapStateToProps)(PrivateRoute);
