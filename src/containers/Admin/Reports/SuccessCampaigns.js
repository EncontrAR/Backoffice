import React from 'react';
import StatusReport from './../../../components/admin/reports/campaignStatusReport';
import reportActions from '../../../redux/report/actions';
import { connect } from 'react-redux';

const title = 'Lista de campañas exitosas'

const { indexStatusCampaigns } = reportActions;

export class SuccessCampaigns extends React.Component {

	loadPage = (from, to, page, limit) => {
		this.props.indexStatusCampaigns('success', from, to, page, limit)
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

SuccessCampaigns.defaultProps = {
  campaigns: [],
  total_pages: 0,
  total_count: 0
};

function mapStateToProps(state) {
  const { success_campaigns } = state.Report;
  return {
    campaigns: success_campaigns.page,
    total_pages: success_campaigns.total_pages,
    total_count: success_campaigns.total_count
  };
}

export default connect(mapStateToProps, { indexStatusCampaigns })(SuccessCampaigns);