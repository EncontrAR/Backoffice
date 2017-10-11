import React from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import Box from '../../../../components/utility/box';
import { Input, Button, Col, Row } from 'antd';
import alertActions from '../../../../redux/alert/actions';
import { connect } from 'react-redux';

const {
  preCreateAlert,
  createAlert
} = alertActions;

class NewAlert extends React.Component {

	componentWillMount() {
		this.props.preCreateAlert({ "campaign_id": this.props.match.params.campaignId })
	}

  componentWillReceiveProps(nextProps) {
    if (nextProps.creationSuccess) this.props.history.goBack()    
  }

	handleSave = () => {
		this.props.createAlert(Object.assign({}, this.props.newAlert, {}))
	}

	handleCancel = () => {
		this.props.history.goBack()
	}

  handlePreCreateChange(key, value) {
    var newAlert = Object.assign({}, this.props.newAlert, {})
    newAlert[key] = value
    console.dir(newAlert)
    this.props.preCreateAlert(newAlert)
  }

  handleInputChange(field, e) {
    this.handlePreCreateChange(field, e.target.value)
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
		            <h3 className="isoSectionTitle">Alta de alerta</h3>
		          </Col>
		          <Col span={5} offset={15}>
		             <Row type="flex" justify="space-around">
		              <Button type="primary" size="small" onClick={this.handleSave}>Guardar</Button>
		              <Button type="default" size="small" onClick={this.handleCancel}>Cancelar</Button>
		            </Row>
		          </Col>
		        </Row>

		        <Row>
		          <Col style={styleColLeft} span={18}>
		            <Input
		              addonBefore="Título"
		              value={this.props.newAlert.title}
		              onChange={this.handleInputChange.bind(this, 'title')}
		            />

		            <Input
		            	style={{ marginTop: '15px' }}
		              addonBefore="Id de Zona"
		              value={this.props.newAlert.zone_id}
		              onChange={this.handleInputChange.bind(this, 'zone_id')}
		            />

		          </Col>
		        </Row>
		      </div>
		    </Box>
		  </LayoutWrapper>
		);
	}

}

NewAlert.defaultProps = {
  newAlert: {
    "id": '',
    "title": '',
    "notifications_sent": null,
    "expire_date": null,
    "created_at": '',
    "status": '',
    "zone_id": ''
  }
}

function mapStateToProps(state) {
  const { new_alert, creationSuccess } = state.Alert;
  return {
    newAlert: new_alert,
    creationSuccess: creationSuccess
  };
}

export default connect(mapStateToProps, { 
  preCreateAlert, createAlert 
})(NewAlert);