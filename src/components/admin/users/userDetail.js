import React from 'react';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import { message, Input, Button, Col, Row } from 'antd';
import { Link } from 'react-router-dom';


const MAX_LENGTH = 50

var styleColLeft = {
  paddingLeft: '30px',
  paddingRight: '30px'
}

export default class UserDetail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
      lastname: this.props.lastname,
      email: this.props.email,
      password: this.props.password,
      confirm_password: this.props.confirm_password
    }
  }

	saveUser = () => {
		if (this.props.new_mode && this.state.password !== this.state.confirm_password) {
			message.error('Las contraseñas deben coincidir.')
			return
		}

		var user = {
			name: this.state.name,
			lastname: this.state.lastname,
			email: this.state.email,
			password: this.state.password
		}

		this.props.saveUser(user)
	}

	deleteUser = () => {
		this.props.deleteUser()
	}

	editUser = () => {
		this.props.editUser()
	}

	renderButtons = () => {
		if (this.props.new_mode) {
			return (
				<div>
	        <Button type="primary" size="small" onClick={ this.saveUser }>Guardar</Button>
	        <Button type="default" size="small">
	        	<Link to={'/admin/users'}>Cancelar</Link>
	        </Button>
        </div>
			)
		} else if (this.props.edition_mode) {
			return (
				<div>
	        <Button type="primary" size="small" onClick={ this.saveUser }>Guardar</Button>
	        <Button type="default" size="small">
	        	<Link to={'/admin/users'}>Cancelar</Link>
	        </Button>
	        <Button type="danger" size="small" onClick={ this.deleteUser }>Borrar</Button>
        </div>
			)
		} else {
			return (
				<div>
	        <Button type="primary" size="small" onClick={ this.editUser }>Editar</Button>
	        <Button type="default" size="small">
	        	<Link to={'/admin/users'}>Cancelar</Link>
	        </Button>
	        <Button type="danger" size="small" onClick={ this.deleteUser }>Borrar</Button>
        </div>
			)
		}
	}

	render() {
		return (
      <LayoutWrapper className="isoCheckoutPage">
        <Box>
          <div className="isoBillingAddressWrapper">

            <Row type="flex" justify="space-between">
              <Col span={4}>
                <h3 className="isoSectionTitle">{ this.props.title }</h3>
              </Col>
              <Col span={5} offset={15}>
                 { this.renderButtons() }
              </Col>
            </Row>

            <Row>
              <Col style={styleColLeft} span={18}>
                <Input
                  addonBefore="Nombre"
                  value={this.state.name}
                  maxLength={ MAX_LENGTH }
                  onChange={(e) => { this.setState({ name: e.target.value }) }}
                />

                <Input
                	style={{ marginTop: '15px' }}
                  addonBefore="Apellido"
                  value={this.state.lastname}
                  maxLength={ MAX_LENGTH }
                  onChange={(e) => { this.setState({ lastname: e.target.value }) }}
                />

                <Input
                	style={{ marginTop: '15px' }}
                  addonBefore="Email"
                  value={this.state.email}
                  maxLength={ MAX_LENGTH }
                  onChange={(e) => { this.setState({ email: e.target.value }) }}
                />

                <Input
                	style={{ marginTop: '15px' }}
                  addonBefore="Contraseña"
                  value={this.state.password}
                  maxLength={ MAX_LENGTH }
                  type="password"
                  onChange={(e) => { this.setState({ password: e.target.value }) }}
                />

                <Input
              		style={{ marginTop: '15px' }}
                  addonBefore="Confirmar contraseña"
                  value={this.state.confirm_password}
                  maxLength={ MAX_LENGTH }
                  type="password"
                  onChange={(e) => { this.setState({ confirm_password: e.target.value }) }}
                />

              </Col>
            </Row>
          </div>
        </Box>
      </LayoutWrapper>
		)
	}
}

UserDetail.defaultProps = {
  name: '',
  lastname: '',
  email: '',
  password: '',
  confirm_password: ''
}
