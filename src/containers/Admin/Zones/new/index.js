import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import Box from '../../../../components/utility/box';
import { Button, Col, Row, Input } from 'antd';
import { Link } from 'react-router-dom';
import zoneActions from '../../../../redux/zone/actions';
import { connect } from 'react-redux';

const {
	preCreateZone,
  createZone
} = zoneActions;

class NewZone extends Component {

	handleSave = () => {
		this.props.createZone(Object.assign({}, this.props.newZone, {}))
	}

	handleInputChange(field, e) {
		var newZoneData = Object.assign({}, this.props.newZone, {})
		newZoneData[field] = e.target.value

		this.props.preCreateZone(newZoneData)
  }

  componentWillMount() {
  	if (this.props.creationSuccess) this.props.history.goBack()
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

            <div className="isoBillingSection">
              <div className="isoBillingForm">
                <div className="isoInputFieldset">
                  <Input
                    addonBefore="Nombre de la zona"
                    value={this.props.newZone.name}
                    onChange={this.handleInputChange.bind(this, 'name')}
                  />
                </div>

                <Row type="flex" justify="start">
						      <Col span={11}>
		                <div className="isoInputFieldset">
		                  <Input 
		                  	addonBefore="Latitud inferior"
		                  	value={this.props.newZone.south_west_lat}
		                  	onChange={this.handleInputChange.bind(this, 'south_west_lat')}
		                  />
		                </div>
						      </Col>
						      <Col span={11} offset={2}>
		                <div className="isoInputFieldset">
		                  <Input 
		                  	addonBefore="Latitud superior"
		                  	value={this.props.newZone.north_east_lat}
		                  	onChange={this.handleInputChange.bind(this, 'north_east_lat')}
		                 	/>
		                </div>
						      </Col>
						    </Row>

                <Row type="flex" justify="start">
						      <Col span={11}>
		                <div className="isoInputFieldset">
		                  <Input 
			                  addonBefore="Longitud inferior"
			                  value={this.props.newZone.south_west_long}
			                  onChange={this.handleInputChange.bind(this, 'south_west_long')}
			                />
		                </div>
						      </Col>
						      <Col span={11} offset={2}>
		                <div className="isoInputFieldset">
		                  <Input 
		                  	addonBefore="Longitud superior"
		                  	value={this.props.newZone.north_east_long}
		                  	onChange={this.handleInputChange.bind(this, 'north_east_long')}
		                  />
		                </div>
						      </Col>
						    </Row>
              </div>
            </div>
          </div>
        </Box>
      </LayoutWrapper>
    );
  }
}

NewZone.defaultProps = {
  newZone: {
  	name: 'No one',
  	south_west_lat: 0.0,
		south_west_long: 0.0,
		north_east_lat: 0.0,
		north_east_long: 0.0
  },
  creationSuccess: false
};

function mapStateToProps(state) {
	const { newZone, creationSuccess } = state.Zone;
  return {
    newZone: newZone,
    creationSuccess: creationSuccess
  };
}

export default connect(mapStateToProps, { preCreateZone, createZone })(NewZone)

