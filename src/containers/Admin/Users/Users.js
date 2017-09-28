import React, { Component } from 'react';
import Table from '../../../components/uielements/table';
import Pagination from '../../../components/uielements/pagination';
import Box from '../../../components/utility/box';
import ContentHolder from '../../../components/utility/contentHolder';
import Button from '../../../components/uielements/button';
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

const itemsPerPage = 10

class Users extends Component {

	constructor(props) {
		super(props);
		this.state = { page: 1 };
	}

	loadCampaignsPage() {
		this.props.indexAllCampaigns(this.state.page, itemsPerPage)
	}

	componentWillMount() {
		this.loadCampaignsPage()
	}

	pageSelect = (e) => {
		this.setState(e)
		this.loadCampaignsPage()
	}
  
  render() {
		return (
    	<div>
    		<div className="isoSimpleTable">
		        <Table
		          pagination={false}
		          columns={ columns }
		          dataSource={ this.props.campaigns }
		        />
      		</div>
          <Box>
          	<ContentHolder>
          		<Pagination defaultPageSize={itemsPerPage} 
          			defaultCurrent={this.state.page} 
          			total={this.props.total_pages} 
          			onChange={this.pageSelect} />
            </ContentHolder>
          </Box>
          <Button type="primary">
            <Link to={'/dashboard/campaigns/new'}>Nueva campaña</Link>
          </Button>
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

export default connect(mapStateToProps, { indexAllCampaigns })(Users);