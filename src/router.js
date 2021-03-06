import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';

import App from './containers/App/App';
import Admin from './containers/Admin/Admin';
import asyncComponent from './helpers/AsyncFunc';
import Auth0 from './helpers/auth0';

const RestrictedRoute = ({ component: Component, ...rest, isLoggedIn }) =>
  <Route
    {...rest}
    render={props =>
      isLoggedIn || localStorage.getItem('auth_token') !== null
        ? <Component {...props} />
        : <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />}
  />;

const PublicRoutes = ({ history, isLoggedIn }) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Route
          exact
          path={'/'}
          component={asyncComponent(() => import('./containers/Page/signin'))}
        />
        <Route
          exact
          path={'/404'}
          component={asyncComponent(() => import('./containers/Page/404'))}
        />
        <Route
          exact
          path={'/500'}
          component={asyncComponent(() => import('./containers/Page/500'))}
        />
        <Route
          exact
          path={'/signin'}
          component={asyncComponent(() => import('./containers/Page/signin'))}
        />
        <Route
          exact
          path={'/signup'}
          component={asyncComponent(() => import('./containers/Page/signup'))}
        />
        <Route
          exact
          path={'/forgotpassword'}
          component={asyncComponent(() =>
            import('./containers/Page/forgotPassword')
          )}
        />
        <Route
          exact
          path={'/resetpassword'}
          component={asyncComponent(() =>
            import('./containers/Page/resetPassword')
          )}
        />

        <Route
          path="/auth0loginCallback"
          render={props => {
            Auth0.handleAuthentication(props);
          }}
        />
        <RestrictedRoute
          path="/dashboard"
          component={App}
          isLoggedIn={isLoggedIn}
        />
        <RestrictedRoute
          path="/admin"
          component={Admin}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </ConnectedRouter>
  );
};

function mapStateToProps(state) {
  const { loginSuccess } = state.Auth
  return {
    isLoggedIn: loginSuccess
  }
}

export default connect(state => (mapStateToProps))(PublicRoutes);
