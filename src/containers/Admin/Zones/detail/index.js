import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import Box from '../../../../components/utility/box';
import Modal from '../../../../components/feedback/modal';
import { message, Button, Col, Row } from 'antd';
import ZoneView from '../../../../components/admin/locations/zoneView';
import { Link } from 'react-router-dom';
import zoneActions from '../../../../redux/zone/actions';
import { connect } from 'react-redux';

const {
  showZone, updateZone, preUpdateZone, deleteZone, clear, resetEditMsg
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
  	if (nextProps.deleteSuccess) {
  		message.success('La zona se borró correctamente')
  		this.props.history.goBack()
  	} else if (nextProps.deleteFailure) {
  		message.error('La zona no pudo ser borrada')
  		this.props.resetEditMsg()
  	} else if (nextProps.updateSuccess) {
  		message.success('La zona se actualizó correctamente')
  		this.props.resetEditMsg()
  	} else if (nextProps.updateFailure) {
			message.error('La zona no pudo ser actualizada')
			this.props.resetEditMsg()
  	}
  }

	componentWillUnmount() {
		this.props.clear()
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

				    <ZoneView
				    	edit={ this.state.edition }
          		onZoneChange={(zone) => { this.props.preUpdateZone(zone) }} 
          		zone={ this.props.zone }
			    	/>
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
	const { zone, updateSuccess, updateFailure, deleteSuccess, deleteFailure } = state.Zone;
  return {
    zone: zone,
    updateSuccess: updateSuccess,
    updateFailure: updateFailure,
    deleteSuccess: deleteSuccess,
    deleteFailure: deleteFailure
  };
}

export default connect(mapStateToProps, { showZone, updateZone, preUpdateZone, deleteZone, clear, resetEditMsg })(ZoneDetail)