import React, { Component } from 'react';
import campaignActions from '../../../redux/campaign/actions';
import { connect } from 'react-redux';

const {
  createCampaign
} = campaignActions;

class NewCampaign extends Component {

	createCampaign() {
		// TODO
	}
  
  render() {
		return (
    	<div>
    		Esto va a ser la creación de campañas
    	</div>
    );
  }
}

function mapStateToProps(state) {
  const { campaigns } = state.Campaign;
  return {
    campaigns: campaigns
  };
}

export default connect(mapStateToProps, { createCampaign })(NewCampaign);