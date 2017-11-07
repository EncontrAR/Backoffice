import React from 'react';
import StatusReport from './../../../components/admin/reports/campaignStatusReport';
import reportActions from '../../../redux/report/actions';
import { connect } from 'react-redux';

const title = 'Lista de campañas no exitosas'

const { indexStatusCampaigns } = reportActions;

export class FailureCampaigns extends React.Component {

	loadPage = (from, to, page, limit) => {
		this.props.indexStatusCampaigns('failure', from, to, page, limit)
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

FailureCampaigns.defaultProps = {
  campaigns: [],
  total_pages: 0,
  total_count: 0
};

function mapStateToProps(state) {
  const { failure_campaigns } = state.Report;
  return {
    campaigns: failure_campaigns.page,
    total_pages: failure_campaigns.total_pages,
    total_count: failure_campaigns.total_count
  };
}

export default connect(mapStateToProps, { indexStatusCampaigns })(FailureCampaigns);