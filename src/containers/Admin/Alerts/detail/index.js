import React from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import Box from '../../../../components/utility/box';
import { Button, Col, Row } from 'antd';
import Moment from 'react-moment';
import alertActions from '../../../../redux/alert/actions';
import { connect } from 'react-redux';

const {
  showAlert
} = alertActions;

class AlertDetail extends React.Component {

	componentWillMount() {
		this.props.showAlert(this.props.match.params.alertId)
	}

  handleBack = () => {
    this.props.history.goBack()    
  }

	render() {

		var styleColLeft = {
		  paddingLeft: '50px',
		  paddingRight: '50px'
		}

		return (
		  <LayoutWrapper className="isoCheckoutPage">
		    <Box>
		      <div className="isoBillingAddressWrapper">

		        <Row type="flex" justify="space-between">
		          <Col span={6}>
		            <h3 className="isoSectionTitle">Detalle de alerta #{this.props.alert.id}</h3>
		          </Col>
		          <Col span={5} offset={13}>
		             <Row type="flex" justify="end">
		              <Button type="default" size="small" onClick={this.handleBack}>Volver</Button>
		            </Row>
		          </Col>
		        </Row>

		        <Row>
		          <Col style={styleColLeft} span={18}>

		            <div>
			            <span>
			            	<b>Título:</b> {this.props.alert.title}
							    </span>
		            </div>

		            <div style={{ marginTop: '15px' }}>
			            <span>
			            	<b>Zona:</b> {this.props.alert.zone.label}
							    </span>
		            </div>

		            <div style={{ marginTop: '15px' }}>
			            <span>
			            	<b>Notificaciones enviadas:</b> {this.props.alert.notifications_sent}
							    </span>
		            </div>

		            <div style={{ marginTop: '15px' }}>
			            <span>
			            	<b>Fecha de creación:</b> <Moment format="DD/MM/YYYY">{this.props.alert.created_at}</Moment>
							    </span>
		            </div>

		          </Col>
		        </Row>
		      </div>
		    </Box>
		  </LayoutWrapper>
		);
	}

}

AlertDetail.defaultProps = {
  alert: {
    "id": '',
    "title": '',
    "notifications_sent": null,
    "expire_date": null,
    "created_at": '',
    "status": '',
    "zone": {
    	"label": ""
    }
  }
}

function mapStateToProps(state) {
  const { alert } = state.Alert;
  return {
    alert: alert
  };
}

export default connect(mapStateToProps, { showAlert })(AlertDetail);