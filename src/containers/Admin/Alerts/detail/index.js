import React from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import Box from '../../../../components/utility/box';
import { Input, Button, Col, Row } from 'antd';
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
		  paddingLeft: '30px',
		  paddingRight: '30px'
		}

		return (
		  <LayoutWrapper className="isoCheckoutPage">
		    <Box>
		      <div className="isoBillingAddressWrapper">

		        <Row type="flex" justify="space-between">
		          <Col span={4}>
		            <h3 className="isoSectionTitle">Detalle de alerta</h3>
		          </Col>
		          <Col span={5} offset={15}>
		             <Row type="flex" justify="end">
		              <Button type="default" size="small" onClick={this.handleBack}>Volver</Button>
		            </Row>
		          </Col>
		        </Row>

		        <Row>
		          <Col style={styleColLeft} span={18}>
		            <Input
		              addonBefore="Título"
		              value={this.props.alert.title}
		              disabled={true}
		            />

		            <Input
		            	style={{ marginTop: '15px' }}
		              addonBefore="Zona"
		              value={this.props.alert.zone.label}
		              disabled={true}
		            />

		            <Input
		            	style={{ marginTop: '15px' }}
		              addonBefore="Notificaciones enviadas"
		              value={this.props.alert.notifications_sent}
		              disabled={true}
		            />

		            <Input
		            	style={{ marginTop: '15px' }}
		              addonBefore="Fecha de creación"
		              value={this.props.alert.created_at}
		              disabled={true}
		            />

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