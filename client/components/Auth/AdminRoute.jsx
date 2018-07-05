import React from 'react';
import propTypes from 'prop-types';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import materialize from '../../helpers/materialize';

/**
 * @description container component for authenticating
 * routes with admin rights. If not admin redirects to index page
 *
 * @class AdminRoute
 *
 * @extends {React.Component}
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

AdminRoute.propTypes = {
  isAuthenticated: propTypes.bool,
  user: propTypes.object,
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

export default connect(mapStateToProps)(AdminRoute);
