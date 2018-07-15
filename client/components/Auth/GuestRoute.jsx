import React from 'react';
import propTypes from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

/**
 * @description container component for guest
 * routes like login and signup. If logged in already,
 * redirects to index page
 *
 * @class GuestRoute
 *
 * @extends {React.Component}
 */

export class GuestRoute extends React.Component {
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
          (!isAuthenticated
            ? <Component {...props} />
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

GuestRoute.propTypes = {
  isAuthenticated: propTypes.bool,
  component: propTypes.func,
};

/**
 * @description maps state to props
 * @param {object} state - redux state
 *
 * @returns {object} props - props mapped to state
 */
const mapStateToProps = state => ({
  ...state.login,
});

export default connect(mapStateToProps)(GuestRoute);
