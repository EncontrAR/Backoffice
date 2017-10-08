import React, { Component } from 'react';
import Table from '../../../components/uielements/table';
import Pagination from '../../../components/uielements/pagination';
import Button from '../../../components/uielements/button';
import { Row, Col } from 'antd'
import Moment from 'react-moment';
import campaignActions from '../../../redux/campaign/actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const {
  indexAllCampaigns
} = campaignActions;

const statusTranslations = {
  actived: 'Activada',
  deactivated: 'Desactivada',
  expired: 'Expirada'
}

const columns = [{
  title: 'Id',
  dataIndex: 'id',
  key: 'id'
}, {
  title: 'Título',
  key: 'title',
  render: (text, record) => (
    <span>
      { record.title.substring(0,20) }
    </span>
  )
}, {
  title: 'Estado',
  key: 'status',
  render: (text, record) => (
    <span>
      { statusTranslations[record.status] }
    </span>
  )
}, {
  title: 'Persona perdida (DNI)',
  key: 'missing_person',
  render: (text, record) => (
    <span>
      {`${record.missing_person.name} ${record.missing_person.lastname} (${record.missing_person.dni})`}
    </span>
  )
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
      <Link to={`/admin/campaigns/${record.id}`}>Ver detalle</Link>
    </span>
  ),
}];

const initialPage = 1
const itemsPerPage = 10

class Campaigns extends Component {

  componentWillMount() {
    this.loadCampaignsPage()
  }

	loadCampaignsPage = (page) => {
		this.props.indexAllCampaigns(page, itemsPerPage)
	}

	pageSelect = (e) => {
		this.loadCampaignsPage(e)
	}

  render() {
    return (
      <div>
        <div className="isoLayoutContentWrapper">
          <div className="isoLayoutContent">
            <Row>
              <Col span={6}>
                <h2>Lista de campañas</h2>
              </Col>
              <Col span={4} offset={14}>
                <Button type="primary">
                  <Link to={'/admin/campaigns/new'}>Nueva campaña</Link>
                </Button>
              </Col>
            </Row>
            <br />
            <div className="isoSimpleTable">
              <Table
                pagination={false}
                columns={ columns }
                dataSource={ this.props.campaigns }
              />
            </div>
            <br />
            <Pagination defaultPageSize={ itemsPerPage }  
              defaultCurrent={ initialPage } 
              total={ this.props.total_count }
              onChange={ this.loadCampaignsPage } />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { campaigns, total_pages, total_count } = state.Campaign;
  return {
    campaigns: campaigns,
    total_pages: total_pages,
    total_count: total_count
  };
}

export default connect(mapStateToProps, { indexAllCampaigns })(Campaigns);