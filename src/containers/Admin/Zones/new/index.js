import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import Box from '../../../../components/utility/box';
import { message, Button, Col, Row } from 'antd';
import ZoneView from '../../../../components/admin/locations/zoneView';
import { Link } from 'react-router-dom';
import zoneActions from '../../../../redux/zone/actions';
import { connect } from 'react-redux';

const {
	preCreateZone,
  createZone,
  resetCreateMsg,
  clear
} = zoneActions;

class NewZone extends Component {

	handleSave = () => {
		this.props.createZone(Object.assign({}, this.props.newZone, {}))
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
          	<ZoneView 
          		edit={ true }
          		onZoneChange={(zone) => { this.props.preCreateZone(zone) }} 
          		zone={ this.props.newZone }
        		/>
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

