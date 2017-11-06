import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import Box from '../../../../components/utility/box';
import { message, Button, Col, Row, Input } from 'antd';
import SearchInput from '../../../../components/admin/locations/searchInput';
import CoordinateInput from '../../../../components/admin/locations/coordinateInput';
import { Link } from 'react-router-dom';
import zoneActions from '../../../../redux/zone/actions';
import { connect } from 'react-redux';

const {
	preCreateZone,
  createZone,
  resetCreateMsg,
  clear
} = zoneActions;

const MAX_LENGTH = 30

class NewZone extends Component {

	handleSave = () => {
		this.props.createZone(Object.assign({}, this.props.newZone, {}))
	}

	handleInputChange(field, e) {
		var newZoneData = Object.assign({}, this.props.newZone, {})
		newZoneData[field] = e.target.value

		this.props.preCreateZone(newZoneData)
  }

  onLocationSelect = (point, lat, lng) => {
		var newZoneData = Object.assign({}, this.props.newZone, {})

  	if (point === 'south-west') {
			newZoneData.south_west_lat = lat
			newZoneData.south_west_long = lng
  	} else if (point === 'north-east') {
			newZoneData.north_east_lat = lat
			newZoneData.north_east_long = lng
  	}

  	this.props.preCreateZone(newZoneData)
  }

  componentWillReceiveProps(nextProps) {
  	if (nextProps.creationSuccess) {
  		message.success('Zona creada exitosamente')
  		this.props.history.goBack()		
  	} else if (nextProps.creationFailure) {
  		message.error('No pudo crearse la zona')
  		this.props.resetCreateMsg()
  	}
  }

	componentWillUnmount() {
		this.props.clear()
	}
  
  render() {
		return (
      <LayoutWrapper className="isoCheckoutPage">
        <Box>
          <div className="isoBillingAddressWrapper">

				    <Row type="flex" justify="space-between">
				      <Col span={4}>
				      	<h3 className="isoSectionTitle">Crear zona</h3>
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

            <div className="isoBillingForm" style={{ 'paddingLeft': '30px' }}>
              <div className="isoInputFieldset">
              	<Row>
	                <Input
	                  addonBefore="Nombre de la zona"
	                  span={ 12 }
	                  value={ this.props.newZone.label }
	                  maxLength={ MAX_LENGTH }
	                  onChange={ this.handleInputChange.bind(this, 'label') }
	                />
                </Row>
              </div>

              <Row>
              	<Col span={11}>
              		<Row>
              			<CoordinateInput 
              				label="Latitud Suroeste" 
              				coordinate="south_west_lat"
              				value={ this.props.newZone.south_west_lat }
              				onLocationChange={ (field, e) => { this.handleInputChange(field, e) }}
              			/>
              			<CoordinateInput 
              				label="Longitud Suroeste" 
              				coordinate="south_west_long"
              				value={ this.props.newZone.south_west_long }
              				onLocationChange={ (field, e) => { this.handleInputChange(field, e) }}
              			/>
	                </Row>
	                <Row>
	                	<SearchInput onLocationSelect={(lat, lng) => { this.onLocationSelect('south-west', lat, lng) }} />
	                </Row>
                </Col>

                <Col span={11} offset={1}>
              		<Row>
              			<CoordinateInput 
              				label="Latitud Noreste" 
              				coordinate="north_east_lat"
              				value={ this.props.newZone.north_east_lat }
              				onLocationChange={ (field, e) => { this.handleInputChange(field, e) }}
              			/>
              			<CoordinateInput 
              				label="Longitud Noreste" 
              				coordinate="north_east_long"
              				value={ this.props.newZone.north_east_long }
              				onLocationChange={ (field, e) => { this.handleInputChange(field, e) }}
              			/>
	                </Row>
	                <Row>
	                	<SearchInput onLocationSelect={(lat, lng) => { this.onLocationSelect('north-east', lat, lng) }} />
	                </Row>
                </Col>
              </Row>
            </div>
          </div>
        </Box>
      </LayoutWrapper>
    );
  }
}

NewZone.defaultProps = {
  newZone: {
  	label: 'No one',
  	south_west_lat: 0.0,
		south_west_long: 0.0,
		north_east_lat: 0.0,
		north_east_long: 0.0
  },
  creationSuccess: false,
  creationFailure: false
};

function mapStateToProps(state) {
	const { newZone, creationSuccess, creationFailure } = state.Zone;
  return {
    newZone: newZone,
    creationSuccess: creationSuccess,
    creationFailure: creationFailure
  };
}

export default connect(mapStateToProps, { preCreateZone, createZone, resetCreateMsg, clear })(NewZone)

