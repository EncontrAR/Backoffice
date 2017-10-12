import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import Box from '../../../../components/utility/box';
import Modal from '../../../../components/feedback/modal';
import { Button, Col, Row, Input } from 'antd';
import { Link } from 'react-router-dom';
import zoneActions from '../../../../redux/zone/actions';
import { connect } from 'react-redux';

const {
  showZone, updateZone, preUpdateZone, deleteZone
} = zoneActions;

class ZoneDetail extends Component {

  constructor(props) {
    super(props)
    this.state = { 
    	edition: false,
    	deleteModal: false
    }
  }

  componentWillMount() {
    this.props.showZone(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
  	if (nextProps.deleteSuccess) this.props.history.goBack()		
  }

	handleOnPress = () => {
		if (this.state.edition) {
			var zone = Object.assign({}, this.props.zone, {})
			this.props.updateZone(zone)
		}

		this.setState({ edition: !this.state.edition })
	}

	handleDeleteOk = () => {
		this.setState( { deleteModal: false } )
		this.props.deleteZone(this.props.match.params.id)
	}

	handleDeleteCancel = () => {
		this.setState( { deleteModal: false } )
	}

	handleOnDelete = () => {
		this.setState( { deleteModal: true } )
	}

	updateZone = () => {
		this.props.updateZone(this.props.match.params.id, 
		{
			label: updateZone.label, 
      south_west_lat: updateZone.south_west_lat,
      south_west_long: updateZone.south_west_long,
      north_east_lat: updateZone.north_east_lat,
      north_east_long: updateZone.north_east_long
		})
	}

	handleInputChange(field, e) {
		var updatedZoneData = Object.assign({}, this.props.zone, {})
		updatedZoneData[field] = e.target.value

		this.props.preUpdateZone(updatedZoneData)
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
				      <Col span={6}>
				      	 <Row type="flex" justify="space-between">
	                <Button type="primary" size="small" onClick={this.handleOnPress}>{ this.state.edition ? 'Guardar' :  'Editar' }</Button>
	                <Button type="default" size="small">
	                	<Link to={'/admin/zones'}>Cancelar</Link>
	                </Button>
	                <Button type="danger" size="small" onClick={this.handleOnDelete}>Borrar</Button>
	                <Modal
					          title="Borrar zona"
					          visible={this.state.deleteModal}
					          onOk={this.handleDeleteOk}
					          onCancel={this.handleDeleteCancel}>
					          <p>¿Estás seguro que querés borrar la zona?</p>
				        	</Modal>
	              </Row>
				      </Col>
				    </Row>

            <div className="isoBillingSection">
              <div className="isoBillingForm">
                <div className="isoInputFieldset">
                  <Input
                    addonBefore="Nombre de la zona"
                    value={this.props.zone.label}
                    disabled={!this.state.edition}
                    onChange={this.handleInputChange.bind(this, 'name')}
                  />
                </div>

                <Row type="flex" justify="start">
						      <Col span={11}>
		                <div className="isoInputFieldset">
		                  <Input 
		                  	addonBefore="Latitud inferior"
		                  	value={this.props.zone.south_west_lat}
		                  	disabled={!this.state.edition}
		                  	onChange={this.handleInputChange.bind(this, 'south_west_lat')}
		                  />
		                </div>
						      </Col>
						      <Col span={11} offset={2}>
		                <div className="isoInputFieldset">
		                  <Input 
		                  	addonBefore="Latitud superior"
		                  	value={this.props.zone.north_east_lat}
		                  	disabled={!this.state.edition}
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
			                  value={this.props.zone.south_west_long}
			                  disabled={!this.state.edition}
			                  onChange={this.handleInputChange.bind(this, 'south_west_long')}
			                />
		                </div>
						      </Col>
						      <Col span={11} offset={2}>
		                <div className="isoInputFieldset">
		                  <Input 
		                  	addonBefore="Longitud superior"
		                  	value={this.props.zone.north_east_long}
		                  	disabled={!this.state.edition}
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

ZoneDetail.defaultProps = {
  zone: {
  	label: 'No one',
  	south_west_lat: 0.0,
		south_west_long: 0.0,
		north_east_lat: 0.0,
		north_east_long: 0.0
  }
};

function mapStateToProps(state) {
	const { zone, deleteSuccess } = state.Zone;
  return {
    zone: zone,
    deleteSuccess: deleteSuccess
  };
}

export default connect(mapStateToProps, { showZone, updateZone, preUpdateZone, deleteZone })(ZoneDetail)


