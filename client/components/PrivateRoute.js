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
      ...props
    } = this.props;

    return (
            <Route
                {...props}
                render={componentProps =>
                    (isAuthenticated
                        ?
                            <Component {...props} />
                        : (
                            <Redirect to={{
                                pathname: '/login',
                                state: { from: componentProps.location },
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
