import React from 'react';
import UserDetail from '../../../../components/admin/users/userDetail';
import userActions from '../../../../redux/user/actions';
import { message } from 'antd';
import { connect } from 'react-redux';

const {
  createUser,
  clearMsg
} = userActions;

class NewUser extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.creationSuccess) {
      message.success('El usuario fue creado correctamente.')
      this.props.history.goBack()
    } else if (nextProps.creationFailure) {
      message.error('El usuario no pudo ser creado.')
    }

    this.props.clearMsg()
  }

	saveUser = (user) => {
		this.props.createUser(user)
	}

	render() {
		return (
			<UserDetail
			title={ 'Alta de usuarios' }
			new_mode={ true }
			saveUser={ (user) => { this.saveUser(user) } }
			/>
		)
	}

}

function mapStateToProps(state) {
  const { creationSuccess, creationFailure } = state.User;
  return {
    creationSuccess: creationSuccess,
    creationFailure: creationFailure
  };
}

export default connect(mapStateToProps, { createUser, clearMsg })(NewUser);