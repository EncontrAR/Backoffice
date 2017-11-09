import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import Box from '../../../../components/utility/box';
import Modal from '../../../../components/feedback/modal';
import { Button, Col, Row, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import missingPersonActions from '../../../../redux/missing_person/actions';
import { connect } from 'react-redux';
const { Option } = Select;

const {
	showMissingPerson,
  preUpdateMissingPerson,
  updateMissingPerson,
  deleteMissingPerson,
  clear
} = missingPersonActions;

class MissingPersonDetail extends Component {

	constructor(props) {
		super(props)
		this.state = { 
			edition: false,
			deleteModal: false,
			photo: '' 
		}
	}

  componentWillMount() {
    this.props.showMissingPerson(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
  	if (nextProps.deleteSuccess) this.props.history.goBack()		
  }

	componentWillUnmount() {
		this.props.clear()
	}

	handleOnPress = () => {
		if (this.state.edition) {
			var missingPerson = Object.assign({}, this.props.missingPerson, {})
			this.props.updateMissingPerson(missingPerson)
		}

		this.setState({ edition: !this.state.edition })
	}

	handleInputChange(field, e) {
		var missingPerson = Object.assign({}, this.props.missingPerson, {})
		missingPerson[field] = e.target.value
		this.props.preUpdateMissingPerson(missingPerson)
  }

  handleGenderChange = (value) => {
  	var missingPerson = Object.assign({}, this.props.missingPerson, {})
		missingPerson.gender = value
		this.props.preUpdateMissingPerson(missingPerson)
  }

  handleInputPhoto(field, e) {
  	this.setState({ photo: e.target.value })
  }

  handleApplyPhoto = () => {
  	var missingPerson = Object.assign({}, this.props.missingPerson, {})
		missingPerson.photo = this.state.photo
		this.props.preUpdateMissingPerson(missingPerson)
  }

	handleDeleteOk = () => {
		this.setState( { deleteModal: false } )
		this.props.deleteMissingPerson(this.props.match.params.id)
	}

	handleDeleteCancel = () => {
		this.setState( { deleteModal: false } )
	}

	handleOnDelete = () => {
		this.setState( { deleteModal: true } )
	}
  
  render() {

  	var styleColRight = {
      paddingLeft: '30px'
  	}

   	var styleColLeft = {
   		paddingLeft: '30px',
      paddingRight: '30px'
  	}

  	var stylePhoto = {
			background: '50% 50% no-repeat',
			width: '185px',
			height: '185px'
  	}

		return (
      <LayoutWrapper className="isoCheckoutPage">
        <Box>
          <div className="isoBillingAddressWrapper">

				    <Row type="flex" justify="space-between">
				      <Col span={6}>
				      	<h3 className="isoSectionTitle">{ this.state.edition ? 'Edición de persona perdida' :  'Detalle de persona perdida' }</h3>
				      </Col>
				      <Col span={6}>
				      	 <Row type="flex" justify="space-between">
	                <Button type="primary" size="small" onClick={this.handleOnPress}>{ this.state.edition ? 'Guardar' :  'Editar' }</Button>
	                <Button type="default" size="small">
	                	<Link to={'/admin/missingpeople'}>Cancelar</Link>
	                </Button>
	                <Button type="danger" size="small" onClick={this.handleOnDelete}>Borrar</Button>
	                <Modal
					          title="Borrar persona perdida"
					          visible={this.state.deleteModal}
					          onOk={this.handleDeleteOk}
					          onCancel={this.handleDeleteCancel}>
					          <p>¿Estás seguro que querés borrar la persona perdida?</p>
				        	</Modal>
	              </Row>
				      </Col>
				    </Row>

				    <Row>
				    	<Col span={12} style={ styleColRight }>

	              <Input
	                addonBefore="Nombre"
	                value={this.props.missingPerson.name}
	                onChange={this.handleInputChange.bind(this, 'name')}
	                disabled={!this.state.edition}
	              />

                <Input
                	style={{ 'marginTop': '30px' }}
                  addonBefore="Apellido"
                  value={this.props.missingPerson.lastname}
                  onChange={this.handleInputChange.bind(this, 'lastname')}
                  disabled={!this.state.edition}
                />

                <Input
                	style={{ 'marginTop': '30px' }}
                  addonBefore="DNI"
                  value={this.props.missingPerson.dni}
                  onChange={this.handleInputChange.bind(this, 'dni')}
                  disabled={!this.state.edition}
                />

                <Row type="flex" justify="space-between" style={{ 'marginTop': '25px' }}>
	                <Input
	                	style={{ 'width': '45%' }}
	                  addonBefore="Edad"
	                  value={this.props.missingPerson.age}
	                  onChange={this.handleInputChange.bind(this, 'age')}
	                  disabled={!this.state.edition}
	                />

	                <Select 
	                	value={this.props.missingPerson.gender}
	                	style={{ 'width': '45%' }}
	                	onChange={ this.handleGenderChange }
	                	disabled={!this.state.edition}>

							      <Option value="female">Femenino</Option>
							      <Option value="male">Masculino</Option>

							    </Select>
                </Row>
				    	</Col>

				    	<Col span={12} style={ styleColLeft }>
				    		<img style={ stylePhoto } alt="" src={this.props.missingPerson.photo} />
				    		<Row style={{ 'marginTop': '30px' }}>
				    			<Input
					    			style={{ 'marginRight': '20px', 'width': '70%' }}
	                  addonBefore="Foto"
	                  value={this.props.missingPerson.photo}
	                  disabled={!this.state.edition}
	                  onChange={this.handleInputPhoto.bind(this, 'photo')}
	                />
	                <Button 
	                	style={{ 'height': '35px' }}
	                	type="primary" size="small"
	                	disabled={!this.state.edition}
	                	onClick={this.handleApplyPhoto}>
	                		Aplicar
	                </Button>
				    		</Row>
				    	</Col>
				    </Row>

          </div>
        </Box>
      </LayoutWrapper>
    );
  }
}

MissingPersonDetail.defaultProps = {
  missingPerson: {
  	name: '',
  	lastname: '',
  	gender: '',
  	dni: '',
  	photo: '',
  	age: ''
  },
  deleteSuccess: false
};

function mapStateToProps(state) {
	const { missing_person, deleteSuccess } = state.MissingPerson;
  return {
    missingPerson: missing_person,
    deleteSuccess: deleteSuccess
  };
}

export default connect(mapStateToProps, { showMissingPerson,
  preUpdateMissingPerson,
  updateMissingPerson,
  deleteMissingPerson,
  clear })(MissingPersonDetail)