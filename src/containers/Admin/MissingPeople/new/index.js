import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import Box from '../../../../components/utility/box';
import { Button, Col, Row, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import missingPersonActions from '../../../../redux/missing_person/actions';
import { connect } from 'react-redux';
const { Option } = Select;

const {
	preCreateMissingPerson,
  createMissingPerson
} = missingPersonActions;

class NewMissingPerson extends Component {

	constructor(props) {
		super(props)
		this.state = { photo: '' }
	}

	handleSave = () => {
		this.props.createMissingPerson(Object.assign({}, this.props.newMissingPerson, {}))
	}

	handleInputChange(field, e) {
		var newMissingPerson = Object.assign({}, this.props.newMissingPerson, {})
		newMissingPerson[field] = e.target.value
		this.props.preCreateMissingPerson(newMissingPerson)
  }

  handleGenderChange = (value) => {
  	var newMissingPerson = Object.assign({}, this.props.newMissingPerson, {})
		newMissingPerson.gender = value
		this.props.preCreateMissingPerson(newMissingPerson)
  }

  handleInputPhoto(field, e) {
  	this.setState({ photo: e.target.value })
  }

  handleApplyPhoto = () => {
  	var newMissingPerson = Object.assign({}, this.props.newMissingPerson, {})
		newMissingPerson.photo = this.state.photo
		this.props.preCreateMissingPerson(newMissingPerson)
  }

  componentWillReceiveProps(nextProps) {
  	if (nextProps.creationSuccess) this.props.history.goBack()		
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
				      	<h3 className="isoSectionTitle">Alta de persona perdida</h3>
				      </Col>
				      <Col span={4}>
				      	 <Row type="flex" justify="space-between">
	                <Button type="primary" size="small" onClick={this.handleSave}>Guardar</Button>
	                <Button type="default" size="small">
	                	<Link to={'/admin/zones'}>Cancelar</Link>
	                </Button>
	              </Row>
				      </Col>
				    </Row>

				    <Row>
				    	<Col span={12} style={ styleColRight }>

	              <Input
	                addonBefore="Nombre"
	                value={this.props.newMissingPerson.name}
	                onChange={this.handleInputChange.bind(this, 'name')}
	              />

                <Input
                	style={{ 'marginTop': '30px' }}
                  addonBefore="Apellido"
                  value={this.props.newMissingPerson.lastname}
                  onChange={this.handleInputChange.bind(this, 'lastname')}
                />

                <Input
                	style={{ 'marginTop': '30px' }}
                  addonBefore="DNI"
                  value={this.props.newMissingPerson.dni}
                  onChange={this.handleInputChange.bind(this, 'dni')}
                />

                <Row type="flex" justify="space-between" style={{ 'marginTop': '25px' }}>
	                <Input
	                	style={{ 'width': '45%' }}
	                  addonBefore="Edad"
	                  value={this.props.newMissingPerson.age}
	                  onChange={this.handleInputChange.bind(this, 'age')}
	                />

	                <Select 
	                	defaultValue="male" 
	                	style={{ 'width': '45%' }}
	                	onChange={ this.handleGenderChange }>

							      <Option value="female">Femenino</Option>
							      <Option value="male">Masculino</Option>

							    </Select>
                </Row>
				    	</Col>

				    	<Col span={12} style={ styleColLeft }>
				    		<img style={ stylePhoto } alt="" src={this.props.newMissingPerson.photo} />
				    		<Row style={{ 'marginTop': '30px' }}>
				    			<Input
					    			style={{ 'marginRight': '20px', 'width': '70%' }}
	                  addonBefore="Foto"
	                  value={this.state.photo}
	                  onChange={this.handleInputPhoto.bind(this, 'photo')}
	                />
	                <Button 
	                	style={{ 'height': '35px' }}
	                	type="primary" size="small"
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

NewMissingPerson.defaultProps = {
  newMissingPerson: {
  	name: '',
  	lastname: '',
  	gender: '',
  	dni: '',
  	photo: '',
  	age: ''
  },
  creationSuccess: false
};

function mapStateToProps(state) {
	const { new_missing_person, creationSuccess } = state.MissingPerson;
  return {
    newMissingPerson: new_missing_person,
    creationSuccess: creationSuccess
  };
}

export default connect(mapStateToProps, { preCreateMissingPerson, createMissingPerson })(NewMissingPerson)