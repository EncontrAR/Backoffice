import React, { Component } from 'react';
import { DateCell, ImageCell, LinkCell, TextCell } from '../Tables/antTables/helperCells';
import IntlMessages from '../../components/utility/intlMessages';
import Table from '../../components/uielements/table';
import Input from '../../components/uielements/input';
import Pagination from '../../components/uielements/pagination';
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import ContentHolder from '../../components/utility/contentHolder';
import campaignActions from '../../redux/campaign/actions';
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

class Campaigns extends Component {

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
		this.state.page = e
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