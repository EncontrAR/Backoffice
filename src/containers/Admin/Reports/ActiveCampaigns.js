import React from 'react';
import StatusReport from './../../../components/admin/reports/campaignStatusReport';
import reportActions from '../../../redux/report/actions';
import { connect } from 'react-redux';

const title = 'Lista de campañas exitosas'

const { indexStatusCampaigns } = reportActions;

export class ActiveCampaigns extends React.Component {

	loadPage = (from, to, page, limit) => {
		this.props.indexStatusCampaigns('actived', from, to, page, limit)
	}

	render() {
		return (
			<StatusReport 
				title={ title }
				campaigns={ this.props.campaigns }
				total_pages= { this.props.total_pages }
				total_count= { this.props.total_count }
				loadPage= { this.loadPage.bind(this) }
			/>
		)
	}
}

ActiveCampaigns.defaultProps = {
  campaigns: [],
  total_pages: 0,
  total_count: 0
};

function mapStateToProps(state) {
  const { actived_campaigns } = state.Report;
  console.dir(actived_campaigns.page)
  return {
    campaigns: actived_campaigns.page,
    total_pages: actived_campaigns.total_pages,
    total_count: actived_campaigns.total_count
  };
}

export default connect(mapStateToProps, { indexStatusCampaigns })(ActiveCampaigns);