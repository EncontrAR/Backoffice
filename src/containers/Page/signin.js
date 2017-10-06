import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Button from '../../components/uielements/button';
import authActions from '../../redux/auth/actions';
import IntlMessages from '../../components/utility/intlMessages';

const { login } = authActions;

class SignIn extends React.Component {

  constructor(props) {
    super(props)
    this.state = { 
      redirectToReferrer: false
    }
  }

  handleInput(field, e) {
    this.setState({ [field]: e.target.value })
  }

  handleLogin = () => {
    this.props.login(this.state.email, this.state.password)
  };

  render() {
    const from = { pathname: '/admin' };
    if (this.props.isLoggedIn) {
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
              <Input 
                size="large" placeholder="Email" 
                onChange={this.handleInput.bind(this, 'email')} />
            </div>

            <div className="isoInputWrapper">
              <Input 
                size="large" type="password" 
                placeholder="Contraseña" 
                onChange={this.handleInput.bind(this, 'password')} />
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

SignIn.defaultProps = {
  isLoggedIn: false
}

function mapStateToProps(state) {
  const { loginSuccess } = state.Auth
  return {
    isLoggedIn: loginSuccess
  }
}

export default connect(mapStateToProps, { login } )(SignIn)
