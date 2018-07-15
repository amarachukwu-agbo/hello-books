import React from 'react';
import propTypes from 'prop-types';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import materialize from '../../helpers/materialize';

/**
 * @description container component for authenticating
 * routes with user rights. If not authenticated user
 * redirects to index page
 *
 * @class UserRoute
 *
 * @extends {React.Component}
 */


export class UserRoute extends React.Component {
  componentDidMount() {
    materialize();
  }

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

UserRoute.propTypes = {
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

export default connect(mapStateToProps)(UserRoute);
