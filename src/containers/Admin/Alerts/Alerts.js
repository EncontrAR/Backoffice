import React, { Component } from 'react';
import Table from '../../../components/uielements/table';
import Pagination from '../../../components/uielements/pagination';
import Button from '../../../components/uielements/button';
import alertActions from '../../../redux/alert/actions';
import { Row, Col } from 'antd';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const {
  indexAlertsForCampaign
} = alertActions;

const columns = [{
  title: 'Id',
  dataIndex: 'id',
  key: 'id'
}, {
  title: 'Título',
  dataIndex: 'title',
  key: 'title'
}, {
  title: 'Zona',
  key: 'zone',
  render: (text, record) => (
    <span>{record.zone.name}</span>
  ),
}, {
  title: 'Notificaciones enviadas',
  dataIndex: 'notifications_sent',
  key: 'notifications_sent'
}, {
  title: 'Fecha de creación',
  key: 'created_at',
  render: (text, record) => (
    <span>
      <Moment format="DD/MM/YYYY">{record.created_at}</Moment>
    </span>
  )
}, {
  title: 'Acción',
  key: 'action',
  render: (text, record) => (
    <span>
      <Link to={`/admin/alerts/${record.id}`}>Ver detalle</Link>
    </span>
  ),
}];

const initialPage = 1
const itemsPerPage = 10

class Alerts extends Component {

  componentWillMount() {
    this.loadAlertsPage(initialPage)
  }

	loadAlertsPage = (page) => {
		this.props.indexAlertsForCampaign(this.props.campaignId, page, itemsPerPage)
	}
  
  render() {
		return (
    	<div>
        <div className="isoLayoutContentWrapper">
          <div className="isoLayoutContent">
            <Row type="flex" justify="space-between">
              <Col span={4}>
                <h2>Lista de alertas</h2>
              </Col>
              <Col span={4}>
                <Button type="primary">
                  <Link to={`/admin/campaigns/${this.props.campaignId}/alerts/new`} params={{ campaignId: this.props.campaignId }}>Nuevo alerta</Link>
                </Button>
              </Col>
            </Row>
            <br />
      		  <div className="isoSimpleTable">
  		        <Table
  		          pagination={false}
  		          columns={ columns }
  		          dataSource={ this.props.alerts }
  		        />
            </div>
            <br />
        		<Pagination defaultPageSize={itemsPerPage} 
        			defaultCurrent={initialPage} 
        			total={this.props.total_pages} 
        			onChange={this.loadAlertsPage} />
          </div>
        </div>
    	</div>
    );
  }
}

function mapStateToProps(state) {
  const { alerts, total_pages, total_count } = state.Alert;
  return {
    alerts: alerts,
    total_pages: total_pages,
    total_count: total_count
  };
}

export default connect(mapStateToProps, { indexAlertsForCampaign })(Alerts);