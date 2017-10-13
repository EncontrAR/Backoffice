import React from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import Box from '../../../../components/utility/box';
import { Input, Button, Col, Row } from 'antd';
import Table from '../../../../components/uielements/table';
import alertActions from '../../../../redux/alert/actions';
import { connect } from 'react-redux';

const {
  preCreateAlert,
  createAlert,
  searchZone
} = alertActions;

class NewAlert extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			zoneLabel: '',
			zoneSelected: {
				label: 'Sin seleccionar'
			}
		}
	}

	componentWillMount() {
		this.props.preCreateAlert({ "campaign_id": this.props.match.params.campaignId })
	}

  componentWillReceiveProps(nextProps) {
    if (nextProps.creationSuccess) this.props.history.goBack()    
  }

	handleSave = () => {
		this.props.createAlert(Object.assign({}, this.props.newAlert, {}))
	}

	// Ok
	handleCancel = () => {
		this.props.history.goBack()
	}

  handleInputLabel(field, value) {
    var newAlert = Object.assign({}, this.props.newAlert, {})
    console.dir(field)
    console.dir(value)
    newAlert[field] = value.target.value
    console.dir(newAlert)
    this.props.preCreateAlert(newAlert)
  }

  // Ok
  handleSelect(field, value) {
    this.setState({ zoneSelected: field })
    var newAlert = Object.assign({}, this.props.newAlert, {})
    newAlert.zone_id = field.id
    this.props.preCreateAlert(newAlert)
  }

  // Ok
  handleInputSearch(field, value)  {
  	this.setState({ zoneLabel: value.target.value })
  }

  // Ok
  handleSearch() {
    this.props.searchZone(this.state.zoneLabel)
  }

	render() {

    const columns = [{
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    }, {
      title: 'Zona',
      dataIndex: 'label',
      key: 'label'
    }, {
		  title: 'Latitud inferior',
		  dataIndex: 'south_west_lat',
		  key: 'south_west_lat'
		}, {
		  title: 'Longitud inferior',
		  dataIndex: 'south_west_long',
		  key: 'south_west_long'
		}, {
		  title: 'Latitud superior',
		  dataIndex: 'north_east_lat',
		  key: 'north_east_lat'
		}, {
		  title: 'Longitud superior',
		  dataIndex: 'north_east_long',
		  key: 'north_east_long'
		}, {
      title: 'Acción',
      key: 'action',
      render: (text, record) => (
        <Button type="primary" onClick={this.handleSelect.bind(this, record)}>
          Seleccionar
        </Button>
      ),
    }];

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
		          <Col style={styleColLeft} span={24}>
		            <Input
		            	style={{ width: '70%' }}
		              addonBefore="Título"
		              value={this.props.newAlert.title}
		              onChange={this.handleInputLabel.bind(this, 'title')}
		            />

				        <h3 style={{ marginTop: '15px' }}>Zona</h3><br/>
				        <h4>{this.state.zoneSelected.label}</h4><br/>

				        <Row type="flex" justify="start">
				          <Input
				            style={{ width: '70%', marginRight: '10px' }}
				            addonBefore="Nombre de zona"
				            value={this.state.zoneLabel}
				            onChange={this.handleInputSearch.bind(this, 'zone')}
				          />
				          <Button type="primary" onClick={this.handleSearch.bind(this)}>Buscar</Button>
				        </Row>

				        <div className="isoSimpleTable">
				          <Table
				            pagination={false}
				            columns={ columns }
				            dataSource={ this.props.zones }
				          />
				        </div>

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
    "zone_id": '',
    "zones": []
  }
}

function mapStateToProps(state) {
  const { new_alert, creationSuccess, zones } = state.Alert;
  return {
    newAlert: new_alert,
    creationSuccess: creationSuccess,
    zones: zones
  };
}

export default connect(mapStateToProps, { 
  preCreateAlert, createAlert, searchZone
})(NewAlert);