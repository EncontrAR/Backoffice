import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Button from '../../components/uielements/button';
import authActions from '../../redux/auth/actions';
import IntlMessages from '../../components/utility/intlMessages';

const { login } = authActions;

class SignIn extends React.Component {

  state = {
    redirectToReferrer: false
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }

  handleLogin = () => {
    const { login } = this.props;
    this.props.login("lucas@encontrar.com", "12345678");
    this.props.history.push('/dashboard');
  };

  render() {
    const from = { pathname: '/dashboard' };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <div className="isoSignInPage">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to="/signin">
              <IntlMessages id="page.signInTitle" />
            </Link>
          </div>

          <div className="isoSignInForm">
            <div className="isoInputWrapper">
              <Input size="large" placeholder="Email" />
            </div>

            <div className="isoInputWrapper">
              <Input size="large" type="password" placeholder="Contraseña" />
            </div>

            <div className="isoInputWrapper isoLeftRightComponent">
              <Button type="primary" onClick={this.handleLogin}>
                <IntlMessages id="page.signInButton" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.Auth.get('idToken') !== null ? true : false
  }
};

export default connect(
  mapStateToProps,
  {login}
)(SignIn);
