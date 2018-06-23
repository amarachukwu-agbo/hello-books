import React from 'react';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import materialize from '../helpers/materialize';

/**
 * Private route to admin page
 * If not admin redirects to index page
 */

class AdminRoute extends React.Component {
  componentDidMount() {
    materialize();
  }
  render() {
    const {
      isAuthenticated,
      user,
      component: Component,
      ...rest
    } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          (isAuthenticated && user.role === 'Admin'
            ?
            <Component {...props} />
            : (
              <Redirect to={{
                pathname: '/',
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

export default connect(mapStateToProps)(AdminRoute);
