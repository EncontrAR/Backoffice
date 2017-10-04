import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import Box from '../../../../components/utility/box';
import { Button, Col, Row, Input } from 'antd';
import zoneActions from '../../../../redux/zone/actions';
import { connect } from 'react-redux';

const {
  showZone, updateZone, preUpdateZone, deleteZone
} = zoneActions;

class ZoneDetail extends Component {

  constructor(props) {
    super(props)
    this.state = { 
    	edition: false
    }
  }

	enableEdition = () => {
		const newEditionState = !this.state.edition

		this.setState(
			{ 
				edition: newEditionState
			})
	}

  componentWillMount() {
    this.loadZone()
  }

 	loadZone = () => {
		this.props.showZone(this.props.match.params.id)
	}

	updateZone = () => {
		this.props.updateZone(this.props.match.params.id, 
		{
			name: updateZone.name, 
      south_west_lat: updateZone.south_west_lat,
      south_west_long: updateZone.south_west_long,
      north_east_lat: updateZone.north_east_lat,
      north_east_long: updateZone.north_east_long
		})
	}

	handleInputChange(field, e) {
		this.props.preUpdateZone({
      [field]: e.target.value
    })
  }
  
  render() {
		return (
      <LayoutWrapper className="isoCheckoutPage">
        <Box>
          <div className="isoBillingAddressWrapper">

				    <Row type="flex" justify="space-between">
				      <Col span={4}>
				      	<h3 className="isoSectionTitle">{ this.state.edition ? 'Edición de zona' :  'Detalle de zona' }</h3>
				      </Col>
				      <Col span={4}>
				      	 <Row type="flex" justify="space-between">
	                <Button type="primary" size="small" onClick={this.enableEdition}>{ this.state.edition ? 'Guardar' :  'Editar' }</Button>
	                <Button type="danger" size="small">Cancelar</Button>
	              </Row>
				      </Col>
				    </Row>

            <div className="isoBillingSection">
              <div className="isoBillingForm">
                <div className="isoInputFieldset">
                  <Input
                    name="name"
                    addonBefore="Nombre de la zona"
                    value={this.props.zone.name}
                    disabled={!this.state.edition}
                    onChange={this.handleInputChange.bind(this, 'name')}
                  />
                </div>

                <Row type="flex" justify="start">
						      <Col span={11}>
		                <div className="isoInputFieldset">
		                  <Input 
		                  	name="south_west_lat" 
		                  	addonBefore="Latitud inferior"
		                  	value={this.props.zone.south_west_lat}
		                  	disabled={!this.state.edition}
		                  />
		                </div>
						      </Col>
						      <Col span={11} offset={2}>
		                <div className="isoInputFieldset">
		                  <Input 
		                  	name="north_east_lat" 
		                  	addonBefore="Latitud superior"
		                  	value={this.props.zone.north_east_lat}
		                  	disabled={!this.state.edition}
		                 	/>
		                </div>
						      </Col>
						    </Row>

                <Row type="flex" justify="start">
						      <Col span={11}>
		                <div className="isoInputFieldset">
		                  <Input 
			                  name="south_west_long" 
			                  addonBefore="Longitud inferior"
			                  value={this.props.zone.south_west_long}
			                  disabled={!this.state.edition}
			                />
		                </div>
						      </Col>
						      <Col span={11} offset={2}>
		                <div className="isoInputFieldset">
		                  <Input 
		                  	name="north_east_long" 
		                  	addonBefore="Longitud superior"
		                  	value={this.props.zone.north_east_long}
		                  	disabled={!this.state.edition}
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

ZoneDetail.defaultProps = {
  zone: {
  	name: 'No one',
  	south_west_lat: 0.0,
		south_west_long: 0.0,
		north_east_lat: 0.0,
		north_east_long: 0.0
  }
};

function mapStateToProps(state) {
  const { zone } = state.Zone;
  return {
    zone: zone
  };
}

export default connect(mapStateToProps, { showZone, updateZone, preUpdateZone, deleteZone })(ZoneDetail)


