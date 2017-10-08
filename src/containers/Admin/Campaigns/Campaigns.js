import React, { Component } from 'react';
import Table from '../../../components/uielements/table';
import Pagination from '../../../components/uielements/pagination';
import Button from '../../../components/uielements/button';
import { Row, Col } from 'antd'
import campaignActions from '../../../redux/campaign/actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const {
  indexAllCampaigns
} = campaignActions;

const columns = [{
  title: 'Id',
  dataIndex: 'id',
  key: 'id'
}, {
  title: 'Título',
  dataIndex: 'title',
  key: 'title'
}, {
  title: 'Descripción',
  dataIndex: 'description',
  key: 'description'
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
            <Row type="flex" justify="space-between">
              <Col span={6}>
                <h2>Lista de campañas</h2>
              </Col>
              <Col span={5}>
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